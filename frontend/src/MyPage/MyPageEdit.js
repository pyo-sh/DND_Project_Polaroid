import React, { Component } from 'react';
import { editMyPage } from './MyPageFunction';

class MyPageEdit extends Component {
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
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type = "text" name ="name" onChange = {this.onChange} value = {name}></input>
                    <input type ="textarea" name ="about" onChange = {this.onChange} value = {about}></input>
                    <button type= "submit">변경</button>
                </form>
            </div>
        );
    }
}

export default MyPageEdit;