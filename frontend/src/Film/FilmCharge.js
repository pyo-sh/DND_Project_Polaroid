import React, { Component } from 'react';
import { chargeFilm } from './FilmFunction';
import jwt_decode from "jwt-decode";
import './FilmCharge.css';

class FilmCharge extends Component {  // 충전할 때 받을 것들 더 생각. css 꾸미기.
    state = {
        money : ''
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        let token = "";
        const { money } = this.state;
        localStorage.usertoken
         ? (token = localStorage.getItem("usertoken"))
        : (token = sessionStorage.getItem("usertoken"));
        const decodetoken = jwt_decode(token);
        const id = decodetoken.ID;
        const info = {
            id,
            money
        }
        chargeFilm(info);

    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        const {money} = this.state;
        return (
            <div class = "charge">
                <form onSubmit={this.onSubmit}>
                    얼마를 충전하시겠습니까?
                    <input placeholder="돈" name = "money" value = {money}
                    onChange={this.onChange}/>
                    <button type="submit">충전!</button>
                </form>
            </div>
        );
    }
}

export default FilmCharge;
