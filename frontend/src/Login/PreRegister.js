import React, { Component } from 'react';
import { register } from './UserFunctions';

class PreRegister extends Component {
    state = {
        email : '',
        NAME : '',
        PASSWORD : ''
    }
    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            NAME : this.state.NAME,
            email: this.state.email,
            PASSWORD: this.state.PASSWORD
        }

        register(user).then(res => {
            if(res) {
                this.props.history.push(`user/login`)
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>sign up</h1>
                    <div>
                        <label htmlFor="NAME">name</label>
                        <input type="text" name="NAME"
                        placeholder="Enter name"
                        value={this.state.NAME}
                        onChange={this.onChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email"
                        placeholder="Enter Email"
                        value={this.state.email}
                        onChange={this.onChange}/>
                    </div>
                    <div>
                        <label htmlFor="PASSWORD">password</label>
                        <input type="password" name="PASSWORD"
                        placeholder="Enter password"
                        value={this.state.PASSWORD}
                        onChange={this.onChange}/>
                    </div>
                    <button type="submit" >Register</button>
                </form>
            </div>
        );
    }
}

export default PreRegister;