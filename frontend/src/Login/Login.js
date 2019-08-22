import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { sessionLogin, localLogin } from './UserFunctions';



class Login extends Component {
    state = {
        click : false,
        ID : '',
        email : '',
        PASSWORD: '',
    }

    handleClick = () => {
        this.setState ({
            click: !this.state.click
        })

        if(!this.state.click){
          alert("로그인 상태 유지를 합니다.")
        }
          
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            ID: this.state.ID,
            PASSWORD: this.state.PASSWORD
        }

        this.state.click ? 
          localLogin(user).then(res => {
            if(res) {
                this.props.history.push(`/mypage`)
            }
          }) :
          sessionLogin(user).then(res => {
              if(res) {
                  this.props.history.push(`/mypage`)
              }
          })
    }

    render() {

        const checkStyleChange = {
            color:'black'
        }

        const checkStyleOrigin = {
            color: 'white'
        }

        let checkStyle = this.state.click ? checkStyleChange : checkStyleOrigin
      
        return (
          <div className="Login-Box">
            <div>
              <h1>Welcome Back Polaroid !</h1>
              <form onSubmit={this.onSubmit} method="post">
                <div className="Login-Box-Info">
                  <label htmlFor="ID">
                    <h4>아이디</h4>
                  </label>
                  <input
                    placeholder="ID"
                    type="text"
                    name="ID"
                    value={this.state.ID}
                    onChange={this.onChange}
                  />
                  <label htmlFor="PASSWORD">
                    <h4>password</h4>
                  </label>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    name="PASSWORD"
                    value={this.state.PASSWORD}
                    onChange={this.onChange}
                  />
                  <br />
                  <div>
                    <i
                      onClick={this.handleClick}
                      className="far fa-check-circle"
                      style={checkStyle}
                    />
                    로그인 상태 유지
                  </div>
                  <div className="Login-Button-Align">
                    <button type="submit" className="Login-Button">
                      로그인
                    </button>
                  </div>
                  <div className="Login-Box-Bottom">
                    <Link to="/user/signup" className="Link">
                      회원가입{" "}
                    </Link>
                    <div className="find">
                      <Link to="/user/findid" className="Link">아이디 찾기 </Link>
                      <Link to="/user/findpassword" className="Link"> 비밀번호 찾기 </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
        }
}

export default Login