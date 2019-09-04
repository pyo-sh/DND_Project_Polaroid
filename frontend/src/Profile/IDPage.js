import React, { Component } from 'react';
import './IDPage.css';
import MyProfile from '../MyPage/MyProfile';
import Photos from '../Main/Photos';
import { getAllInfo } from '../MyPage/MyPageFunction';

class IDPage extends Component {
    state ={
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
        this.upperTitle();
    }
    componentDidMount(){
        this.getInfo();
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

    render() {
        const {profile} = this.state;
        return (
            <div className="IDPage">
                <div className="IDPage-Profile">
                    <MyProfile profile={profile}/>
                    <FollowBtn/>
                </div>
                <div className="IDPage-Title">UPLOADED PHOTOS</div>
                <div className="IDPage-Photo">
                    <Photos mypage = {true}/>
                </div>
            </div>
        );
    }
}

const FollowBtn = () => {
    return <button className="IDPage-FollowBtn">Follow</button>
}

export default IDPage;