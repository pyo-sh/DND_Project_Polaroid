import { editMyPage } from './MyPageFunction';
import './MyProfileEdit.css';
import React, { Component } from 'react';


// /* 현재 작업해야 할 것
//     내 정보란
//         ㅁㄴㄻㄴㄻㄴㄹㄹㅇ 하기
//     쪽지 ??
// 비밀번호 치고 들어가야?
//     계정보호 ??
//     회원정보 변경
//     회원탈퇴
// */

class MyProfileEdit extends Component {
    state = { // props로 받아와서 state 업데이트 하고 그거를 db에 보내고~
        //닉넴이랑 어바웃을 state에 업데이트 한다음에 그거를 db로 보내서 db를 업데이트하고 
        // props로 받아온 editOnClick 과 getInfo를 실행시켜서 MyPage의 스테이트 값들을 업데이트 시킴
        id : '',
        name: '',
        about: '',
    }
    componentDidMount() { // 처음 input 상자에 적히게 하기 위함.
        this.setState({
            id : this.props.profile.id,
            name : this.props.profile.name,
            about : this.props.profile.about
        })
    }
    // componentDidUpdate(prevProps, prevState) {  // 없어도 될듯.
    //     if(prevProps.profile.about !== this.props.profile.about){
    //         const { id, name, about } = this.props.profile;
    //         this.setState({
    //             id, name, about
    //         })
    //     } 
    // }
    onSubmit = (e) => {
      e.preventDefault();
      const { id, name, about } = this.state;
      console.log(id, name, about);
      const user = {
          id, 
          name,
          about
      }
      editMyPage(user)
      .then(res => {
          console.log("에딧페이지후 " + res);
          this.props.editOnClick();
          this.props.getInfo();
          return res;
      })
      .catch(err => console.error(err));
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        const { name, about } = this.state;
        return (
            <div className="MyProfile-Edit">
                <form onSubmit={this.onSubmit}>
                    <div className="MyProfile-Edit-Secend">
                        <div className="MPEdit-Title">프로필 사진</div>
                        <MPEditPhoto photo={this.props.profile.photo}/>
                    </div>
                    <div className="MyProfile-Edit-Secend">
                        <div className="MPEdit-Title">닉네임</div>
                        <MPEditInput name ="name" onChange = {this.onChange} value = {name}/>
                    </div>
                    <div className="MyProfile-Edit-Secend">
                        <div className="MPEdit-Title" >설명</div>
                        <MPEditTextarea name ="about" onChange = {this.onChange} value = {about}/>
                    </div>
                    <div className="MyProfile-Edit-Secend">
                        <div className="MPEdit-Title"></div>
                    </div>
                    <button type="submit">수정</button>
                </form>
            </div>
        );
    }
}

const MPEditPhoto = ({photo}) => {
    return(
        <div className="MPEdit-Cell">
            <img className="MPEdit-Photo" src = {photo} alt = "Profile"/>
            <div className="MPEdit-Subtitle">URL 주소</div>
            <div className="MPEdit-Photo-Edit">
                <input className = "MPEdit-Photo-Input"></input>
                <button className= "MPEdit-TdCell-Btn">UPLOAD</button>
            </div>
        </div>
    );
};

const MPEditInput = ({name, onChange, value}) => {
    return(
        <div className = "MPEdit-Cell">
            <input 
            className = "MPEdit-TdCell-Input"
            name = {name} 
            onChange = {onChange} 
            value = {value}></input>
            <button className = "MPEdit-TdCell-Btn">중복확인</button>
        </div>
    );
};

const MPEditTextarea = ({name, onChange, value}) => {
    return(
        <div className="MPEdit-Cell">
            <textarea 
            cols="40" 
            rows="5" 
            className = "MPEdit-TdCell-Textarea"
            name = {name}
            onChange = {onChange} 
            value = {value}/>
        </div>
    );
};

export default MyProfileEdit;