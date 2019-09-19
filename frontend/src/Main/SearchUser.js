import React, {Component} from 'react';
import Users from '../Profile/ProfileSmall';
import jwt_decode from 'jwt-decode';
import './ContentTop.css';

class SearchUser extends Component {
    getID = () => {
        let token = "";
        localStorage.usertoken
          ? (token = localStorage.getItem("usertoken"))
          : (token = sessionStorage.getItem("usertoken"));
        if (token === null) return null;
        const decode = jwt_decode(token);
        const ID = decode.ID;
        return ID;
      };
      //indexOf() 사용
      //검색한 단어를 가진 아이디들을 뽑아서 배열에 넣어....

      /*
    idContrast = () =>{
        let searchimages = this.state.images.filter(searchimage => {
            let temp = searchimage.tag.split(',');
            return temp.includes(search)
        })
    } */

    render() {
        return ( 
        <div className = "Search-User">
            <Users id = {this.props.id} isMe = {this.props.id === this.getID()} isFollow = {false}/>
            
            {/*<Users id = "201712651" isMe = {false} isFollow = {true}/>
            <Users id = "201712651" isMe = {true} isFollow = {true}/>
            <Users id = "201712651" isMe = {false} isFollow = {false}/>
        <Users id = "201712651" isMe = {false} isFollow = {true}/>*/}
        </div> );
    }
}
 
export default SearchUser;