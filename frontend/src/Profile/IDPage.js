import React, { Component } from 'react';
import './IDPage.css';
import MyProfile from '../MyPage/MyProfile';
import Photos from '../Main/Photos';
import { getAllInfo } from '../MyPage/MyPageFunction';
import { getMyID, isFollowInfo, addFollow, deleteFollow } from './ProfileFunction';

class IDPage extends Component {
    state ={
        myID: "",
        titleName: "",
        isMe: false, // myID == titleName 일때 true
        isFollow: false, // 내가 이사람을 팔로우 하고 있는지
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
    
    // 처음 클래스를 불러올 때 실행하는 것들 [나의 아이디와 상대방의 프로파일 정보]
    componentWillMount(){
        const myID = getMyID();
        this.upperTitle();
        this.setState({
            myID: myID
        });
    }
    // 처음 클래스를 불러오고 render 후에 변경하는 정보들 (필요한 state값이 바뀐걸 받아서 정보 처리)
    componentDidMount(){
        this.getInfo();
        if(!this.checkMyself())
            this.checkIsFollow();
    }

    // 상대방의 아이디를 알아내는 작업
    upperTitle(){
        let title = this.props.match.params.id;
        title = title.replace('-',' ');
        this.setState({
            ...this.state,
            titleName: title
        });
    }

    //upperTitle로 아이디를 알아내서 정보를 받아오는 함수 (상대방의 프로필 정보)
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
        if(myID === titleName || myID === null){
            this.setState({
                isMe: true
            });
            return true;
        }
        return false;
    }
    // 팔로우 중인지 아닌지를 알아보는 boolean isFollow 설정
    checkIsFollow = () => {
        const { myID, titleName } = this.state;
        isFollowInfo(myID, titleName).then(res => {
            if(res)
                this.setState({
                    isFollow: true
                })
            else
                this.setState({
                    isFollow: false
                })
        })
    }

    // 팔로우 버튼을 눌렀을 때 실행
    onClickFollow =  () => {
        const { myID, titleName, isFollow } = this.state;
        if(isFollow){
            deleteFollow( myID, titleName ).then(_=>{
                this.checkIsFollow();
                this.getInfo();
            });
        }
        else{
            addFollow( myID, titleName ).then(_ => {
                this.checkIsFollow();
                this.getInfo();
            });
        }
    }

    render() {
        const { profile, isMe, isFollow } = this.state;
        return (
            <div className="IDPage">
                <div className="IDPage-Profile">
                    <MyProfile profile={profile}/>
                    <div className="IDPage-Btn">
                        <FollowBtn
                            isFollow={isFollow}
                            isMe={isMe}
                            onClickFollow={this.onClickFollow}
                            reFresh={this.reFresh}
                            />
                    </div>
                </div>
                <div className="IDPage-Title">UPLOADED PHOTOS</div>
                <div className="IDPage-Photo">
                    <Photos mypage = {true}/>
                </div>
            </div>
        );
    }
}

const FollowBtn = ({ isFollow, isMe, onClickFollow }) => {
    if(!isMe){
        return <button className = {isFollow === true ? "IDPage-Following" : "IDPage-Follow"} onClick = {onClickFollow}>
                {isFollow  === true? "Following" : "Follow"}
            </button>
    }
    else
        return null;
}

export default IDPage;