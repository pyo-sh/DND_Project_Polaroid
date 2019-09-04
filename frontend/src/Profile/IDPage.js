import React, { Component } from 'react';
import './IDPage.css';
import MyProfile from '../MyPage/MyProfile';
import Photos from '../Main/Photos';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { getMyID, isFollowInfo } from './ProfileFunction';

class IDPage extends Component {
    state ={
        myID: "",
        isMe: false,
        isFollow: false,
        titleName: "",
        profile: {
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y",
            name: "",
            id: "",
            about: "",
            following: 0,
            follower: 0,
            grade: "일반",
            // 마이프로필인지 다른사람프로필인지 확인하는 boolean
            checkProfile: false
        }
    }

    // 아이디를 알아내는 작업
    upperTitle(){
        let title = this.props.match.params.id;
        title = title.replace('-',' ');
        this.setState({
            ...this.state,
            titleName: title
        });
    }
    
    componentWillMount(){
        const myID = getMyID();
        this.upperTitle();
        this.setState({
            myID: myID
        })
    }
    componentDidMount(){
        this.getInfo();
        this.checkMyself();
    }

    //upperTitle로 아이디를 알아내서 정보를 받아오는 함수
    getInfo = () => {
        const ID = this.state.titleName;
        getAllInfo(ID).then(res=> {
            this.setState({
                profile: {
                    ...this.state.profile,
                    id : ID,
                    name : res.nickname,
                    about : res.introduce,
                    following: res.follow,
                    follower : res.follower,
                    grade : res.grade
                }
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    // 이 페이지가 나에 대한 페이지라면, 팔로우 버튼을 없애야 하므로 boolean 설정
    checkMyself = () => {
        const { myID, titleName } = this.state;
        if(myID === titleName){
            this.setState({
                isMe: true
            });
        }
        console.log(isFollowInfo(myID, titleName));
        console.dir(isFollowInfo("ironman", "ansrjsdn"));
    }

    onClickFollow = () => {

    }

    render() {
        const { profile, isMe } = this.state;
        return (
            <div className="IDPage">
                <div className="IDPage-Profile">
                    <MyProfile profile={profile}/>
                    {FollowBtn(isMe)}
                </div>
                <div className="IDPage-Title">UPLOADED PHOTOS</div>
                <div className="IDPage-Photo">
                    <Photos mypage = {true}/>
                </div>
            </div>
        );
    }
}

const FollowBtn = ( isMe ) => {
    if(!isMe){
        return <button className="IDPage-FollowBtn">Follow</button>
    }
    else
        return null;
}

export default IDPage;