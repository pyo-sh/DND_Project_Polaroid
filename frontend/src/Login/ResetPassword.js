import React, { Component } from 'react';
import { ResetPwd } from './UserFunctions';
import jwt_decode from 'jwt-decode';

class ResetPassword extends Component {
    state = {
        PASSWORD: '',
        PWDCHECK : ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        const {userID} = this.props.match.params;
        const {token} = this.props.match.params; // 토큰이 jwt 형식인지 확인해서 아니면
        const decodeToken = jwt_decode(token); // decode 못하게 하는 방식이 좋지 않을까 생각듦
        console.log(decodeToken);
        if(decodeToken.ID === userID && decodeToken.auth === true) {
            const user = {
                userID,
                PASSWORD : this.state.PASSWORD
            }
            ResetPwd(user);
            alert('password가 바꼈습니다.');
            this.props.history.push('/user/login');
            console.log('리셋된다ㅏㅏㅏ');
        }
        else {
            console.log('에러입니다!');
        }
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.onSubmit}>
                    <div>패스워드</div>
                    <input type ="password" placeholder="PASSWORD" onChange = {this.onChange} name ="PASSWORD" value={this.state.PASSWORD}></input>
                    <div>패스워드체크</div>
                    <input type="password" placeholder="PASSWORDCHECK"onChange = {this.onChange} name="PWDCHECK" value={this.state.PWDCHECK}></input>
                    <button type="submit">리셋</button>
                </form>
            </div>
        );
    }
}

export default ResetPassword;