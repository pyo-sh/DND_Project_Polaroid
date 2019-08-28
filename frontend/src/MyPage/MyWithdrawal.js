import './MyWithdrawal.css';
import { del } from '../Login/DeleteUser';
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';

// 회원탈퇴 페이지
class MyWithdrawal extends Component{
    state = {
        id: '',
        checkID: ''
    }
    componentDidMount = () => {
        this.setState({
            id: this.props.id
        })
    }
    render(){
        return(
            <div className="MyWithdrawal">
                <h1 className="MyWithdrawal-Title">정말 탈퇴하시겠습니까?</h1>
                <p className="MyWithdrawal-P">
                    지금 탈퇴하신다면,<br/>지금까지 다운로드 / 업로드 한 사진과 남은 수익이 전부 사라집니다.<br/>
                    탈퇴를 원하시면 아래의 빈칸에 자신의 닉네임을 다시 입력해 주세요.
                </p>
                <div>아이디 : {this.props.id}</div>
                <input 
                    className="MyWithdrawal-Input"
                    onChange={this.onChange}
                    />
                <button 
                    onClick={this._Access} 
                    className="MyWithdrawal-Btn">
                    회원 탈퇴
                </button>
            </div>
        );
    }
    _Access = () => {
        const {id, checkID} = this.state;
        if(checkID === id){
            del();
            this.props.history.push('/');
        }
        else{
            console.log("안됨")
        }
    }
    onChange = (e) => {
        this.setState({
            checkID: e.target.value
        })
    }
}

export default withRouter(MyWithdrawal);