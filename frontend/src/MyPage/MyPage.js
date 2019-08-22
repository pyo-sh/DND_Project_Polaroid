import './MyPage.css';
import MyProfile from './MyProfile';
import MyPageMenuBar from './MyPageMenuBar';
import MyPageBenefit from './MyPageBenefit';
import React, { Component } from 'react';
import MyPageEdit from './MyPageEdit';
import { getAllInfo } from './MyPageFunction';
import jwt_decode from 'jwt-decode';
import MyPageBenefit from './MyPageBenefit';

class MyPage extends Component { // 프로필 값들을 setState로 업데이트 하기 위해서 state값으로 넣음.
    state ={
        selectedMenu: "d",
        editMode : false,
        profile : {
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
        const { editMode, profile} = this.state;
        return (
            <>
            {editMode === false ? 
            <div className="MyPage">
                <MyProfile profile={profile}/>
                <button onClick={this.editOnClick}>수정</button>
                    <div className="null">
                <MyPageMenuBar MenuOnClick={this.MenuOnClick}/>
                     {this._SelectMenu()}
                    </div>
            </div> : 
            <MyPageEdit profile={profile} getInfo={this.getInfo} editOnClick={this.editOnClick}/>}
            </>
        )
    }
    getInfo = () => {
        const token = localStorage.getItem('usertoken');
        const decode = jwt_decode(token);
        const ID = decode.ID;
        console.log(ID);
        getAllInfo(ID).then(res=> {
            console.log(res);
            console.log('여기 실행');
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
            case "UPLOAD" : return <div>표석훈바보</div>
            case "DOWNLOADED" : return ;
            case "LIKED" : return;
            case "FAVORITE" : return;
<<<<<<< HEAD
            case "BENEFIT" : return <MyPageBenefit profile={profile}/>;
            case "MY PAGE" : return ;
=======
            case "BENEFIT" : return <MyPageBenefit profile={this.state.profile}/>;
            case "MY PAGE" : return;
>>>>>>> mun
            default : return <div className="loading-screen">
                {/* <img className="MyPage" src="http://m.red.kia.com/kr/common/images/txt/error_txt1.png" alt="메롱!"/> */}
            </div>;
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