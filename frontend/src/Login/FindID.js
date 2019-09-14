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
      <div className="Find-Box">
        <div>
          <h1>Find ID!</h1>
          <form className = "Find-Form"onSubmit ={this.onSubmit}>
              <div className="Find-Font">Email을 입력하세요.</div>
              <input type="email" placeholder="EMail" name="email" onChange={this.onChange} value ={this.state.email} />
                <button type="submit" className="Find-Button">확인</button>
          </form>
        </div>
      </div>
    );
  }
}

export default FindID;
