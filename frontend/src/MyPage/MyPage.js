import './MyPage.css';
import MyProfile from './MyProfile';
import MyPageMenuBar from './MyPageMenuBar';
import MyPageBenefit from './MyPageBenefit';
import MyProfileEdit from './MyProfileEdit';
import React, { Component } from 'react';
import { getAllInfo } from './MyPageFunction';
import jwt_decode from 'jwt-decode';

class MyPage extends Component {
    state ={
        selectedMenu: "UPLOAD",
        editMode: false,
        profile: {
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y",
            name: "",
            id: "",
            about: "",
            following: 0,
            follower: 0,
            grade: "일반",
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
            }
        }
    }
    componentDidMount(){ // 렌더링이 되고 난 후 getInfo를 실행 시킴으로서 db에 있는 해당 아이디의 정보들을 가지고 와서 setState 시킴
        this.getInfo();
    }
    render() {
        const {editMode, profile} = this.state;
        return (
            <div className="MyPage">
                <MyProfile profile={profile}/>
                <div className="null">
                    <MyPageMenuBar MenuOnClick={this.MenuOnClick}/>
                    {this._SelectMenu()}
                </div>
            </div>
        );
    }
    getInfo = () => {
        let token = '';
        localStorage.usertoken ? token = localStorage.getItem('usertoken') : token = sessionStorage.getItem('usertoken');
        const decode = jwt_decode(token);
        const ID = decode.ID;
        console.log(ID);
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
    
    _SelectMenu = () => {
        const type = this.state.selectedMenu;
        switch(type) {
            case "UPLOAD" : return ;
            case "DOWNLOADED" : return ;
            case "LIKED" : return ;
            case "FAVORITE" : return ;
            case "BENEFIT" : return <MyPageBenefit profile={this.state.profile}/>;
            case "MY PAGE" : return <MyProfileEdit profile={this.state.profile} getInfo={this.getInfo} editOnClick={this.editOnClick}/>;
            default : return <div className="loading-screen"></div>;
        }
    }
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
    editOnClick = () => {
        const { editMode } = this.state;
        if( editMode === false){
            this.setState({
                editMode : true
            })
        }
        else {
            this.setState({
                editMode : false
            })
        }
     
    }
}

export default MyPage;