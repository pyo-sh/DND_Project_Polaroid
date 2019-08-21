import React, { Component } from "react";
import { findId } from "./UserFunctions";
import "./FindID.css";

class FindID extends Component {
  state = {
    email: ""
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    findId(email).then(res=>{
      this.props.history.push('/user/login');
    })
  
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    return (
      <div className="Find-ID-Box">
        <div>
          <h1>Welcome Back Polaroid !</h1>
          <form onSubmit ={this.onSubmit}>
            <div className="Find-ID-Box-Info">
              <div className="Find-ID-Font">Email을 입력하세요.</div>
              <input type="email" placeholder="EMail" name="email" onChange={this.onChange} value ={this.state.email} />
              <div className="Find-ID-Button-Align">
                <button type="submit" className="Find-ID-Button">확인</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FindID;
