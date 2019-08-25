import './MyInformation';
import MyProfileEdit from './MyProfileEdit';
import MyInformationMenu from './MyInformationMenu';
import MyWithdrawal from './MyWithdrawal';

import React, { Component } from 'react';

class MyInformation extends Component{
    state = {
        selectMode: "기본",
        checkPW: true // 임시
    }
    render(){
        return(
            <div>
                {this._renderPage()}
            </div>
        );
    }
    _renderPage = () => {
        const {selectMode} = this.state;
        switch(selectMode) {
            case "회원정보수정" : return <MyProfileEdit profile={this.props.profile} getInfo={this.props.getInfo} editOnClick={this.editOnClick}/>;
            case "회원탈퇴" : return <MyWithdrawal/>;
            default : return <MyInformationMenu profile={this.props.profile} editOnClick={this.editOnClick} checkPW={this.state.checkPW} checkOnClick={this.checkOnClick}/>;
        }
    }
    editOnClick = (e) => {
        const {selectMode, checkPW} = this.state;
        if(checkPW){
            if(selectMode === "기본"){
                this.setState({
                    selectMode: e.target.innerText
                });
            }
            else{
                this.setState({
                    selectMode: "기본"
                });
            }
        }
    }
    checkOnClick = (e) => {
        const {checkPW} = this.state;
        console.log(checkPW);
        if(checkPW) {
            this.setState({
                checkPW: false
            });
        }
        else {
            this.setState({
                checkPW: true
            });
        }
    }
}

export default MyInformation;