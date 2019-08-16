import React, { Component } from 'react';
import { login } from './UserFunctions';

class PreLogin extends Component {
    state = {
        email : '',
        PASSWORD : ''
    }
    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            PASSWORD: this.state.PASSWORD
        }

        login(user).then(res => {
            if(res) {
                this.props.history.push(`/profile`)
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} method="post">
                    <h1>sign in</h1>
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
                    <button type="submit">submit</button>

                </form>
            </div>
        );
    }
}

export default PreLogin;