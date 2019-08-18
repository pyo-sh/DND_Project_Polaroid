import React, { Component } from 'react';
import { findPassword } from './UserFunctions';
import "./FindPassword.css";

class FindPassword extends Component {
    state = {
        ID : '',
        email : ''
    }
    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            ID : this.state.ID,
            email : this.state.email
        }
        findPassword(user).then(res => {   // 비밀번호찾기 이메일과 id를 서버로 보냄
            console.log(res);
        });
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
          <div className="Find-Password-Box">
            <div>
                <h1>Welcome Back Polaroid !</h1>
                <form onSubmit = {this.onSubmit}>
                <div className = "Find-Password-Box-Info">
                    <div className = "Find-Password-Font">
                    아이디를 입력하세요.
                    </div>
                    <input type = "text" placeholder = "ID" name="ID" onChange={this.onChange}></input>
                    <div className = "Find-Password-Font">
                    Email을 입력하세요.
                    </div>
                    <input type = "email" placeholder = "EMail" name="email" onChange={this.onChange}></input>
                    <div className = "Find-Password-Button-Align">
                        <button type = "submit" className = "Find-Password-Button">확인</button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        )
    }
}

export default FindPassword;