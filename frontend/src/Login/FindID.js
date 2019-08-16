import React, { Component } from 'react';
import './FindID.css';

class FindID extends Component {
    render(){
        return (
          <div className="Find-ID-Box">
            <div>
              <h1>Welcome Back Polaroid !</h1>
              <div className="Find-ID-Box-Info">
                <div className="Find-ID-Font">Email을 입력하세요.</div>
                <input type="email" placeholder="EMail" />
                <div className="Find-ID-Button-Align">
                  <input
                    type="submit"
                    className="Find-ID-Button"
                    value="확인"
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default FindID