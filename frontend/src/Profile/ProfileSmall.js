import React, {Component} from 'react';
import './ProfileSmall.css';
import {withRouter} from 'react-router-dom';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { getMyID, addFollow, deleteFollow } from './ProfileFunction';

// 나인지 아닌지, 팔로우 기능을 추가해줘야 하는지 아닌지. 버튼 추가해주거나 홈페이지로 넘어가주거나,
class ProfileSmall extends Component{
    state={
        id: "",
        isMe: false,
        // true : following, false : follower
        isFollow: true,
        profile: {
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y",
            name: "",
            about: "",
            grade: "일반"
        },
        images : [
            {image : "photo1.jpg"}, 
            {image : "photo2.jpg"}, 
            {image : "photo3.jpg"} //고쳐야함
        ]
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
        this.getInfo();
    }

    getInfo = () => {
        const ID = this.state.id;
        getAllInfo(ID).then(res=> {
            this.setState({
                profile: {
                    ...this.state.profile,
                    // photo: res.photo,
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
        this.props.history.push(`/${this.state.id}`);
    }

    render(){
        const { id, isMe, isFollow } = this.state;
        const { photo, name } = this.state.profile;
        return (
            <div className = "ProfileSmall" onClick = {this.movePage}>
                <div className = "ProfileSmall-Column">
                    <div className = "ProfileSmall-ProfileImage" onClick = {() => this.props.history.push(`/Profile/${id}`)}>
                        <ProfileImage photo = {photo} alt = {name}/>
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


function ProfileImage({photo, alt}){
    return (
        <img src = {photo ? photo : "https://postfiles.pstatic.net/MjAxOTA3MzBfMjgy/MDAxNTY0NDkxNDIxOTA3.PDvjdx3QnWA0Bty0KXQAd9IBixEYYBZ7vk3UfijmqlQg.lWtF8Jrtmh-Kv4hra3IXNlY4z3I15DpiPkdh6NiGLC0g.PNG.she2325/%E3%85%81%E3%85%82.png?type=w966"} alt = {alt}></img>
    ); // 프로필 사진이 없으면 검게 나오도록, 후에 사진 id로 대체하여 데이터랑 연결될 예정
}

function UserImage({image}){
     return(
        <div className = "UserImage" style = {{ backgroundImage : `url(${require(`../img/photo/photo5.jpg`)})`}} />
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