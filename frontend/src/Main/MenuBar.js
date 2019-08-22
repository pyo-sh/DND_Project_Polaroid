import React, { Component } from 'react';
import './MenuBar.css';
import {Icon, Dropdown} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class MenuBar extends Component {
    logOut = (e) => {
        e.preventDefault();
        localStorage.usertoken ? localStorage.removeItem('usertoken') :  sessionStorage.removeItem('usertoken');
        alert('로그아웃 되었습니다.');
        this.props.history.push(`/`);

    }
    
    render() {
        return (
            <>
                <header className = "Menu">
                    <div className = "Menu-First">
                        <div className="Menu-Logo">
                          <Icon name="camera retro" style={{marginTop:"10px"}}/>
                           <Link to="/"><span className="Menu-Title" onClick={this.handleState}>Polaroid</span></Link>
                        </div>
                        <form className ="Search-Form">
                            <Icon name="search" size="large"/>
                            <input className = "Menu-Input"/>
                            <Icon name="sliders horizontal"size="large" style={{marginLeft:"10px"}}/>
                        </form>
                    </div>

                    <div className = "Menu-Item">
                        <Dropdown text="Photos" pointing simple item className="link item">
                            <Dropdown.Menu>
                                <Dropdown.Header>Categories</Dropdown.Header>
                                <Dropdown.Item>Best Photos</Dropdown.Item>
                                <Dropdown.Item>Wallpaper</Dropdown.Item>
                                <Dropdown.Item>Nature</Dropdown.Item>
                                <Dropdown.Item>Fashion</Dropdown.Item>
                                <Dropdown.Item>Illustration</Dropdown.Item>
                                <Dropdown.Item>Art Works</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) ? <Link to="/user/login"> <button className = "Login-Btn" onClick={this.onClick}>Login</button></Link> : <button className = "Login-Btn" onClick={this.logOut}>LogOut</button>}
                        {((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) ? <Link to="/user/signup"><button className = "Sign-Btn" onClick={this.onClick}>Sign Up</button></Link> : <Link to="/mypage"><button className = "Sign-Btn" onClick={this.onClick}>My Page</button></Link>} 
                        {((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) ? "" : <Link to="/upload"><button className = "Sign-Btn">Upload</button></Link> } 

                    </div>
                </header>
             </>
        );
    }
}

export default withRouter(MenuBar);