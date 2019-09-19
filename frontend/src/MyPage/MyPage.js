import './MyPage.css';
import MyProfile from './MyProfile';
import MyPageMenuBar from './MyPageMenuBar';
import MyPageBenefit from './MyPageBenefit';
import MyInformation from './MyInformation';
import Photos from '../Main/Photos';
import MyFavorite from './MyFavorite';
import { getAllInfo } from './MyPageFunction';
import jwt_decode from 'jwt-decode';
import React, { Component } from 'react';

// import ProfileSmall from './ProfileSmall';

class MyPage extends Component {
    state ={ // grade 는 안하고 있네 지금 2019.09.17 db에서
        selectedMenu: "UPLOAD",
        profile: {
            profileImg: "",
            name: "",
            id: "",
            about: "",
            following: 0,
            follower: 0,
            grade: "일반",
            film : 0,
            benefit: {
                monthData: [
                    ["x", "2019-01-01", "2019-02-01", "2019-03-01", "2019-04-01", "2019-05-01", "2019-06-01", "2019-07-01", "2019-08-01", "2019-09-01", "2019-10-01", "2019-11-01", "2019-12-01"],
                    ["data1", 10, 20, 30, 40, 50, 60, 0, 0, 0, 0, 0, 0],
                    ["data2", 15, 25, 35, 45, 55, 65, 0, 0, 0, 0, 0, 0],
                    ["data3", 20, 30, 40, 50, 60, 70, 0, 0 ,0, 0, 0, 0]
                ],
                weekData: [
                    ["x", "2018-01-01", "2018-01-08", "2018-01-15", "2018-01-22", "2018-01-29", "2018-01-31"],
                    ["data1", 10, 20, 30, 40, 1],
                    ["data2", 15, 25, 35, 45, 5],
                    ["data3", 20, 30, 40, 50, 10]
                ]
            },
            // 마이프로필인지 다른사람프로필인지 확인하는 boolean
            checkProfile: true
        }
    }
    // 렌더링이 되고 난 후 getInfo를 실행 시키면서 db에 있는 해당 아이디의 정보들을 가지고 와서 setState 시킴
    componentDidMount(){
        this.getInfo();
    }
    render() {
        const {profile} = this.state;
        return (
            <div className="MyPage">
                <div className="MyPage-MyFilm">
                    <MyProfile profile={profile}/>
                </div>
                <div className="MyPage-MenuBar">
                    <MyPageMenuBar MenuOnClick={this.MenuOnClick}/>
                </div>
                <div className = "MyPage-Photos">
                    {this._SelectMenu()}
                </div>
                
            </div>
        );
    }
    getID = () => {
        let token = '';
        localStorage.usertoken ? token = localStorage.getItem('usertoken') : token = sessionStorage.getItem('usertoken');
        const decode = jwt_decode(token);
        const ID = decode.ID;
        return ID;
    }
    getInfo = () => {
        const ID = this.getID();
        // console.log(ID); // 아이디를 콘솔창에서 알아보기 위함
        getAllInfo(ID).then(res=> {
            this.setState({
                profile: {
                    ...this.state.profile,
                    id : ID,
                    name : res.nickname,
                    about : res.introduce,
                    following: res.follow,
                    follower : res.follower,
                    grade : res.grade,
                    film : res.film,
                    profileImg : res.profileImg
                }  
            })
        })
        .catch(err => {
            console.error(err);
        })
    }
    // 메뉴바를 눌러서 버튼의 innerText 값을 받아서 state를 바꾸면 반환하는 페이지가 바뀌는 형식이다.
    _SelectMenu = () => {
        const type = this.state.selectedMenu;
        switch(type) {
            case "UPLOAD" : return <Photos/>;
            case "DOWNLOADED" : return <Photos/>;
            case "LIKED" : return ;
            case "FAVORITE" : return <MyFavorite getID={this.getID}/>;
            case "BENEFIT" : 
                return <MyPageBenefit 
                    profile={this.state.profile}
                    />;
            case "SETTINGS" : 
                return <MyInformation 
                    profile={this.state.profile} 
                    getInfo={this.getInfo}
                    />;
            default : return <div className="loading-screen"></div>;
        }
    }
    // 메뉴바 버튼을 눌렀을 때 state의 값을 버튼의 innerText로 바꾸고 버튼의 이펙트 효과를 만들기 위해 클릭안한 버튼을 제외한 클릭된 버튼의 className을 "MyPage-Menu-Selected" 으로 설정.
    MenuOnClick = (e) => {
        if(e.target.className==="MyPage-Menu-Selected"){}
        else{
            let children = [...e.target.parentNode.children];
            children.map((child) => {
                child.className = null;
                return null;
            })
            e.target.className="MyPage-Menu-Selected";
            this.setState({
                selectedMenu : e.target.innerText
            })
        }
        return null;
    }
}

export default MyPage;