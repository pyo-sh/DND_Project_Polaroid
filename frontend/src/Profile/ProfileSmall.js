import React, {Component} from 'react';
import './ProfileSmall.css';
import {withRouter} from 'react-router-dom';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { getMyID, addFollow, deleteFollow, getUserUpImg } from './ProfileFunction';

// 나인지 아닌지, 팔로우 기능을 추가해줘야 하는지 아닌지. 버튼 추가해주거나 홈페이지로 넘어가주거나,
class ProfileSmall extends Component{
    state={
        id: "",
        isMe: false,
        // true : following, false : follower
        isFollow: true,
        profile: {
            profileImg: "",
            name: "",
            about: "",
            grade: "일반"
        },
        images : []
    };

    componentWillMount(){
        const { id, isMe, isFollow } = this.props;
        this.setState({
            id: id,
            isMe: isMe,
            isFollow: isFollow
        });
    }

    componentDidMount(){
        const { id } = this.state;
        this.getInfo();
        getUserUpImg(id).then(res => {
            this.setState({
                images : res
            })
        })
    }

    getInfo = () => {
        const ID = this.state.id;
        getAllInfo(ID).then(res=> {
            this.setState({
                profile: {
                    ...this.state.profile,
                    profileImg: res.profileImg,
                    name: res.nickname,
                }
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    handleClick = () => {
        const myID = getMyID();
        const { id, isFollow } = this.state;
        if(isFollow){
            deleteFollow( myID, id ).then(_=>{
                this.setState({
                    isFollow: !isFollow
                });
            });
        }
        else{
            addFollow( myID, id ).then(_=>{
                this.setState({
                    isFollow: !isFollow
                });
            });
        }
    }

    movePage = (e) => {
        e.preventDefault();

        if(e.target.nodeName !== 'BUTTON')
            this.props.history.push(`/${this.state.id}`);
    }

    render(){
        const { id, isMe, isFollow } = this.state;
        const { profileImg, name } = this.state.profile;
        return (
            <div className = "ProfileSmall" onClick = {this.movePage}>
                <div className = "ProfileSmall-Column">
                    <div className = "ProfileSmall-ProfileImage" onClick = {() => this.props.history.push(`/${id}`)}>
                        <ProfileImage profileImg = {profileImg} alt = {name}/>
                    </div>
                    <div className = "ProfileSmall-Info">
                        <span className = "Nickname"> {name} </span>
                        <span className = "Id"> {"@" + id} </span>
                        { isFollow != null &&
                        <div className = "ProfileSmall-Follow-Btn">
                            <FollowButton
                                isMe = {isMe}
                                isFollow = {isFollow}
                                handleClick = {this.handleClick}
                                />
                        </div>
                    }
                    </div>
                </div>
                 <div className = "ProfileSmall-Column">
                    {this.state.images.map((image, index) => <UserImage image = {image} key = {index}/>)}
                </div> 
            </div>
        );
    }
}


function ProfileImage({profileImg, alt}){
    return (
        <img src = {profileImg ? profileImg : 'https://poloapp.s3.ap-northeast-2.amazonaws.com/profile/User.svg'} alt = {alt}></img>
    ); // 프로필 사진이 없으면 검게 나오도록, 후에 사진 id로 대체하여 데이터랑 연결될 예정
}

function UserImage({image}){
     return(  // 이미지 아이디받아서 이미지 아이디 따라 나오게 만들어야지.
        <div className = "UserImage" style = {{ backgroundImage : `url(${image.imgUrl})`}} />
     );
 }

const FollowButton = ({ isMe, isFollow, handleClick}) => {
    if(!isMe)
        return(
            <button className = {isFollow === true ? "Following" : "Follow"} onClick = {handleClick}>
                {isFollow  === true? "Following" : "Follow"}
            </button>
        );
    else
        return null;
}

export default withRouter(ProfileSmall);