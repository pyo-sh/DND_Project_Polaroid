import React, { Component } from 'react';
import './Payment.css';

class Payment extends Component {
    state = { // 프라이스 불러오고 바꾸고 하는거 정해야함.
        price : 100
    }
    onDownClick = () => {
        // 다운 했을 때 모달 내려가면서 보유한 필름 깎여야함
        this.props._minusFilm(this.state.price);
        this.props.handlePayment();
        alert('다운로드 되었습니다');
    }

    onCancleClick = () => { 
        // 취소 했을 때 모달 창 닫혀야함.
        this.props.handlePayment();
    }

    //css 좀더 손봐야함
    render() {
        const {film} = this.props;
        const {price} = this.state;
        return (
            <div className = "Payment-overlay">
                <div className = "Payment-Modal">
                    <span className="Payment-Title">이미지 다운로드</span>
                    <div className = "Payment-Content">
                        이미지 가격 : {price} 필름 <br/>
                        현재 보유 필름은 {film}필름 입니다.<br/>
                        정말로 다운 하시겠습니까?
                    </div>
                    <div className = "Payment-Button">
                        <button className = "Payment-Button-download" type ="button" onClick= {this.onDownClick}>다운로드</button>
                        <button className = "Payment-Button-cancle" type ="button" onClick = {this.onCancleClick}>취소</button> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;