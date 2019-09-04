import './MyInformationMenu.css';
import React, { Component } from 'react';

class MyInformationMenu extends Component {
    state = {
        failedPW: false
    }
    componentWillReceiveProps(nextProps){
        if(this.state.failedPW !== nextProps.isFailed){
            this.setState({
                failedPW: nextProps.isFailed
            });
        }
    }
    render() {
        return (
            <div className="MyInformation-Menu">
                <div className="MyInformation-Menu-Tabs">
                    <MyInformationMenuButton editOnClick={this.props.editOnClick} className="MyInformation-Menu-Tab" title="회원정보수정"/>
                    <MyInformationMenuButton editOnClick={this.props.editOnClick} className="MyInformation-Menu-Tab" title="비밀번호변경"/>
                    <MyInformationMenuButton editOnClick={this.props.editOnClick} className="MyInformation-Menu-Tab" title="회원탈퇴"/>
                </div>
                {this._renderPage()}
            </div>
        );
    }
    _renderPage = () => {
        const checkPW = this.props.checkPW;
        if(checkPW){
            return <div className="MyInformation-Pw-True">비밀번호 입력 완료!</div>;
        }
        else{
            return <MyInformationMenuInput
                checkOnClick={this.props.checkOnClick}
                getPassword={this.props.getPassword}
                failedPW={this.state.failedPW}
                />;
        }
    }
}

const MyInformationMenuButton = ({editOnClick, className, title}) => {
    return(
        <button onClick={editOnClick} className={className}> {title} </button> 
    );
}

const MyInformationMenuInput = ({checkOnClick, getPassword, failedPW}) => {
    return(
        <div className="MyInformation-Pw">
            <div className="MyInformation-Pw-Check">회원 비밀번호 확인</div>
            <div className="MyInformation-Pw-Title">
                <input onChange={getPassword} className="MyInformation-Pw-Input" type="password"/>
                <button onClick={checkOnClick} className="MyInformation-Pw-Btn">확인</button>
            </div>
        </div>
    );
}

export default MyInformationMenu;