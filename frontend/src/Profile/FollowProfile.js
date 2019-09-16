import React, {Component} from 'react';
import './FollowProfile.css';
import {withRouter} from 'react-router-dom';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { getMyID, addFollow, deleteFollow } from './ProfileFunction';
import { Link } from 'react-router-dom';

// 나인지 아닌지, 팔로우 기능을 추가해줘야 하는지 아닌지. 버튼 추가해주거나 홈페이지로 넘어가주거나,
class FollowProfile extends Component{
    state={
        id: "",
        follow: true,
        isMe: false,
        // true : following, false : follower
        isFollow: true,
        profile: {
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y",
            name: "",
            id: "",
            about: "",
            grade: "일반"
        }
    }

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
                    id : ID,
                    name : res.nickname,
                    about : res.introduce,
                    grade : res.grade,
                    // photo: res.photo,
                    name: res.nickname,
                }
            })
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

    render(){
        const { id, isMe, isFollow } = this.state;
        const { photo, name } = this.state.profile;
        return (
            <div className = "FollowProfile">
                <div className = "FollowProfile-Column">
                    <Link className= "FollowProfile-Column" to = {`/${id}`}>
                        <div className = "FollowProfile-ProfileImage" onClick = {() => this.props.history.push(`/Profile/${id}`)}>
                            <ProfileImage photo = {photo} alt = {name}/>
                        </div>
                        <div className = "FollowProfile-Info">
                            <span className = "Nickname"> {name} </span>
                            <span className = "Id"> {"@" + id} </span>
                        </div>
                    </Link>
                    { isFollow != null &&
                        <div className = "FollowProfile-Follow-Btn">
                            <FollowButton
                                isMe = {isMe}
                                isFollow = {isFollow}
                                handleClick = {this.handleClick}
                                />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function ProfileImage({photo, alt}){
    return (
        <img src = {photo ? photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y"} alt = {alt}></img>
    ); // 프로필 사진이 없으면 검게 나오도록, 후에 사진 id로 대체하여 데이터랑 연결될 예정
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

export default withRouter(FollowProfile);