import './MyInformationMenu.css';
import React, { Component } from 'react';

class MyInformationMenu extends Component {
    render() {
        return (
            <div className="MyInformation-Menu">
                <div className="MyInformation-Menu-Tabs">
                    <MyInformationMenuButton editOnClick={this.props.editOnClick} className="MyInformation-Menu-Tab" title="회원정보수정"/>
                    <MyInformationMenuButton editOnClick={this.props.editOnClick} className="MyInformation-Menu-Tab" title="회원탈퇴"/>
                </div>
                {this._renderPage(this.props.checkOnClick)}
            </div>
        );
    }
    _renderPage = ({checkOnClick}) => {
        const checkPW = this.props.checkPW;
        if(checkPW){
            return <div className="MyInformation-Pw-True">비밀번호 입력 완료!</div>;
        }
        else{
            return <MyInformationMenuInput checkOnClick={checkOnClick}/>;
        }
    }
}

const MyInformationMenuButton = ({editOnClick, className, title}) => {
    return(
        <button onClick={editOnClick} className={className}> {title} </button> 
    );
}

const MyInformationMenuInput = ({checkOnClick}) => {
    return(
        <div className="MyInformation-Pw">
            <div className="MyInformation-Pw-Check">회원 비밀번호 확인</div>
            <div className="MyInformation-Pw-Title">
                <input className="MyInformation-Pw-Input"/>
                <button onClick={checkOnClick} className="MyInformation-Pw-Btn">확인</button>
            </div>
        </div>
    );
}

export default MyInformationMenu;