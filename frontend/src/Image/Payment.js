import React, { Component } from 'react';
import './Payment.css';

class Payment extends Component {
    state = { // 프라이스 불러오고 바꾸고 하는거 정해야함.
        price : 100,
        authority : {},
        caution : {}
    }

    componentWillMount(){
        let caution = [], authority = [];

        if(this.props.commercialAvailable === "NotCommercialAvailable")
            caution.push("해당 이미지는 상업적 이용이 불가합니다.");
        else authority.push("해당 이미지는 상업적 이용이 가능합니다.");

        if(this.props.copyrightNotice === "CopyrightNotice")
            caution.push("해당 이미지는 저작자의 이름, 출처 등 저작자에 대한 정보를 표시해야 합니다.");
        else  authority.push("해당 이미지는 저작자에 대한 정보를 표시하지 않아도 됩니다.");
        if(this.props.handleValueChange === "NoChange")
            caution.push("해당 이미지는 변경하거나 이미지를 사용한 2차 제작이 불가합니다.");
        else authority.push("해당 이미지는 변경하거나 이미지를 사용한 2차 제작이 가능합니다.");

        this.setState({
            authority : authority,
            caution : caution
        })
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

    printAuthity = () => {
        const authority = this.state.authority.map((li) =>{
            return( <li> {li} </li> );
        })
        return authority;
    }

    printCaution = () => {
        const caution = this.state.caution.map((li) => {
            return( <li> {li} </li> );
        })
        return caution;
    }
    //css 좀더 손봐야함
    render() {
        const {film} = this.props;
        const {price} = this.state;
        return (
            <div className = "Payment-overlay">
                <div className = "Payment-Modal">
                    <h3 className="Payment-Title"> 이미지 다운로드 </h3>
                    <div className = "Payment-Content Border">
                        <h4>권한</h4>
                        <ul className = "Payment-Photo-Authority">
                            {this.printAuthity()}
                        </ul>
                        <h4>주의</h4>
                        <ul className = "Payment-Photo-Caution">
                            {this.printCaution()}
                        </ul>
                    </div>
                    <div className = "Payment-Content">
                        <div className = "Payment-Content-Column">
                            <p> 이미지 가격 : </p>
                            <div className = "Paymeent-Contet-Column-Flim"> {price} </div>
                            <p> 필름 </p>
                        </div>
                        <div className = "Payment-Content-Column">
                            <p> 보유 필름 : </p>
                            <div className = "Paymeent-Contet-Column-Flim"> {film} </div>
                            <p> 필름 </p>
                        </div>
                        다운로드 하시겠습니까?
                    </div>
                    <div className = "Payment-Button">
                        <button className = "Payment-Button-Download" type ="button" onClick= {this.onDownClick}>다운로드</button>
                        <button className = "Payment-Button-Cancle" type ="button" onClick = {this.onCancleClick}>취소</button> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;