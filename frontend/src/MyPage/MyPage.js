import './MyPage.css';
import MyProfile from './MyProfile';
import MyPageMenuBar from './MyPageMenuBar';
import React, { Component } from 'react';

const profile = {
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y",
    name: "닉네임",
    id: "@아이디",
    about: "안녕하십니까? 저는 3가지 면에서 참 좋은 사람입니다. 첫째, 눈이 좋은 사람입니다. 이때까지 내가 해온 것들에 대해~ 둘째, 발이 좋은 사람입니다. 포기하지 않는 열정으로~ 셋째, 미소가 좋은 사람입니다. 보시면 아시다 싶이~ 이러한 저의 장점을 살려 여기서 제 역량을 발휘해 보고싶습니다.",
    following: 845,
    follower: 1456,
    grade: "VIP"
}

class MyPage extends Component {
    state ={
        selectedMenu: "d"
    }
    render() {
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
    
    _SelectMenu = () => {
        const type = this.state.selectedMenu;
        switch(type) {
            case "UPLOAD" : return <div>표석훈바보</div>
            case "DOWNLOADED" : return;
            case "LIKED" : return;
            case "FAVORITE" : return;
            case "BENEFIT" : return <img src ={require(`../benefit.JPG`)} className = "screen"/>;
            case "MY PAGE" : return;
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
}

export default MyPage;