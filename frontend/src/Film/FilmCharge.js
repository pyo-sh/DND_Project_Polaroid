import React, { Component } from "react";
import { chargeFilm } from "./FilmFunction";
import jwt_decode from "jwt-decode";
import "./FilmCharge.css";
import { withRouter } from 'react-router-dom'; 

class FilmCharge extends Component {
  // 충전할 때 받을 것들 더 생각. css 꾸미기.
  state = {
    num: 0,
    money: 0,
    agree: false
  };

  onSubmit = e => {
    e.preventDefault();
    let token = "";
    const { money, num, agree } = this.state;
    if (agree === true) {
      localStorage.usertoken
        ? (token = localStorage.getItem("usertoken"))
        : (token = sessionStorage.getItem("usertoken"));
      const decodetoken = jwt_decode(token);
      const ID = decodetoken.ID;
      const info = {
        ID,
        money,
        num
      };
      chargeFilm(info);
      this.props.history.push('/mypage');
    }
    else{
      alert('동의를 눌려주세요.');
    }
  };

  onChange = e => {
    this.setState({
      num: e.target.value,
      money: e.target.value * 100
    });
  };
  handleChange = () => {
    const { agree } = this.state;
    this.setState({
      agree: !agree
    });
  };
  render() {
    const { money, num, agree } = this.state;
    return (
      <div className="Charge">
        <div className="Charge-Title">필름 충전</div>
        <div className="Charge-Main">
          <form onSubmit={this.onSubmit}>
            <div className="Charge-Contents">
              <div>필름 몇개를 충전하시겠습니까?</div>
              <div>필름 1개당 100원 입니다.</div>
            </div>
            <input
              className="Charge-Input"
              placeholder="개수"
              value={num}
              onChange={this.onChange}
            />
            <div>
              <input
                type="checkBox"
                name="agree"
                value={agree}
                onChange={this.handleChange}
              />
              <div>동의</div>
            </div>
            <span>{money}원</span>
            <button className="Charge-Button" type="submit">
              충전!
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FilmCharge);
