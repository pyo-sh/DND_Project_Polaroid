import { checkPassword } from './MyPageFunction';
import {withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import MyProfileEdit from './MyProfileEdit'
import './MyInformation.css';

class MyInformation extends Component{
    state = {
        checkPW: false, // 임시
        id: '',
        password: '',
        isFailed: false
    }
    render(){
        return(
            <div className="MyInformation">
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

    _renderPage = () => {
        const checkPW = this.state.checkPW;
        if(checkPW){
            return <MyProfileEdit profile={this.props.profile} getInfo={this.props.getInfo} editOnClick={this.editOnClick}/>;
        }
        else{
            return <MyInformationMenuInput
                checkOnClick={this.checkOnClick}
                getPassword={this.getPassword}
                failedPW={this.state.failedPW}
                />;
        }
    }
}


const MyInformationMenuInput = ({checkOnClick, getPassword, failedPW}) => {
    return(
        <div className="MyInformation-Pw">
            <div className="MyInformation-Pw-Check">회원 비밀번호 확인</div>
            <div className="MyInformation-Pw-Title">
                <input onChange={getPassword} className="MyInformation-Pw-Input" type="password"/>
                <button onClick={checkOnClick} className="MyInformation-Pw-Btn">확인</button>
            </div>
            <MyInformationIncorrect failedPW={failedPW}/>
        </div>
    );
}

const MyInformationIncorrect = ({failedPW}) => {
    if(failedPW)
        return <div className="MyInformation-Pw-Incorrect">비밀번호를 다시 입력하세요!</div>
    else
        return <div className="MyInformation-Pw-Incorrect"></div>
}

export default withRouter(MyInformation);