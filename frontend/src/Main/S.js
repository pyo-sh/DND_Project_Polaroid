import React, {Component} from 'react';
import Users from '../Profile/ProfileSmall';
import './ContentTop.css';

class S extends Component {
  
    render() { 
        return ( <div className = "Search-User">
        <Users id = "201712651" isMe = {false} isFollow = {true}/>
        <Users id = "201712651" isMe = {false} isFollow = {true}/>
        <Users id = "201712651" isMe = {false} isFollow = {true}/>
        <Users id = "201712651" isMe = {false} isFollow = {true}/>
        <Users id = "201712651" isMe = {false} isFollow = {true}/>
    </div> );
    }
}
 
export default S;