import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

class LocalProfile extends Component {
    state = {
        nickname : '',
        ID : '',
        email: '',
        auth: '',
        message : '',
    }

    componentDidMount() {
        const localToken = localStorage.usertoken;
        const localDecoded = jwt_decode(localToken);
        
        this.setState({
            ID : localDecoded.ID,
            nickname: localDecoded.nickname,
            email: localDecoded.email,
        })
    }

    render() {
        return (
            <div>
                <h1>PROFILE</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>nickname</td>
                            <td>{this.state.nickname}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.ID}</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{this.state.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LocalProfile;