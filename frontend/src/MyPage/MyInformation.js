import MyProfileEdit from './MyProfileEdit';
import MyInformationMenu from './MyInformationMenu';
import MyWithdrawal from './MyWithdrawal';
import { checkPassword } from './MyPageFunction';
import {withRouter} from 'react-router-dom';

import React, { Component } from 'react';

class MyInformation extends Component{
    state = {
        selectMode: "기본",
        checkPW: false, // 임시
        id: '',
        password: '',
        isFailed: false
    }
    render(){
        return(
            <div>
                {this._renderPage()}
            </div>
        );
    }
    componentDidMount = () => {
        this.setState({
            id: this.props.profile.id
        })
    }
    componentWillReceiveProps = (change) =>{
        this.setState({
            id: change.profile.id
        })
    }
    _renderPage = () => {
        const {selectMode} = this.state;
        switch(selectMode) {
            case "회원정보수정" : return <MyProfileEdit profile={this.props.profile} getInfo={this.props.getInfo} editOnClick={this.editOnClick}/>;
            case "비밀번호변경" : this.props.history.push('/user/findpassword');
                return null;
            case "회원탈퇴" : return <MyWithdrawal id={this.props.profile.id}/>;
            default : 
                return <MyInformationMenu 
                    profile={this.props.profile} 
                    editOnClick={this.editOnClick} 
                    checkPW={this.state.checkPW}
                    checkOnClick={this.checkOnClick}
                    getPassword={this.getPassword}
                    isFailed={this.state.isFailed}
                    />;
        }
    }
    // SETTINGS 페이지의 출력화면을 결정하는 함수
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
    // 비밀번호가 맞는지 확인하는 함수
    checkOnClick = () => {
        const {id, password} = this.state;
        const user = {
            id,
            password
        }
        checkPassword(user).then(res => {
            if(res) {
                this.setState({
                    checkPW: true
                });
            }
            else
                this.setState({
                    isFailed: true
                });
        })
    }
    // SETTINGS의 페이지에서 비밀번호를 받는 input의 값을 가져오는 함수
    getPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
}

export default withRouter(MyInformation);