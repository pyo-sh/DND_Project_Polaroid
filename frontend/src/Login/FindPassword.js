import React, { Component } from 'react';
import "./FindPassword.css";

class FindPassword extends Component {
    render(){
        return(
          <div className="Find-Password-Box">
            <div>
                <h1>Welcome Back Polaroid !</h1>
                <div className = "Find-Password-Box-Info">
                    <div className = "Find-Password-Font">
                    아이디를 입력하세요.
                    </div>
                    <input type = "text" placeholder = "ID"></input>
                    <div className = "Find-Password-Font">
                    Email을 입력하세요.
                    </div>
                    <input type = "email" placeholder = "EMail"></input>
                    <div className = "Find-Password-Button-Align">
                        <input type = "submit" className = "Find-Password-Button" value = "확인"></input>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default FindPassword;