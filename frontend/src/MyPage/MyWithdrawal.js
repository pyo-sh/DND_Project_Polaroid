import './MyWithdrawal.css';
import React, {Component} from 'react';

class MyWithdrawal extends Component{
    render(){
        return(
            <div className="MyWithdrawal">
                <div className="MyWithdrawal-Title">정말 탈퇴하시겠습니까?</div>
                <p></p>
                <button className="MyWithdrawal-Btn">회원 탈퇴</button>
            </div>
        );
    }
}

export default MyWithdrawal;