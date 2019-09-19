import React, {Component} from 'react';
import Users from '../Profile/ProfileSmall';
import jwt_decode from 'jwt-decode';
import './ContentTop.css';
import { getAllUser } from './MainFunction';


class SearchUser extends Component {
    state = {
        userid: [],
        searchids: []
    }

    componentDidMount(){
        getAllUser().then(res => {
            this.setState({
                userid: res
            })
            console.log(this.state.userid);
            this.idContrast();
        })
    }

    componentDidUpdate(prevProps, prevState) { // 서치 값이 달라지면 다시 contrast 하게
        if(prevProps.id !== this.props.id){
          this.idContrast();
        }
    }

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

    idContrast = () =>{
        let { id } = this.props;
        let searchids = this.state.userid.filter(searchid => searchid.ID.includes(id))
        this.setState({
            searchids
        })
        console.log(searchids)
        this.props.getUserCount(searchids.length)
    } 

    render() {
        return ( 
        <div className = "Search-User">
            
            {this.state.searchids.map((ids) => {
                /*console.log(typeof(Object.values(ids).toString()))
                console.log(this.getID())
                console.log(Object.values(ids).toString() === this.getID())*/

                //id는 Object의 값을 받아옴
                return(<Users id = {ids.ID} isMe = {ids.ID === this.getID()} isFollow = {false}/>)
            })}
            
            {/*<Users id = "201712651" isMe = {false} isFollow = {true}/>
            <Users id = "201712651" isMe = {true} isFollow = {true}/>
            <Users id = "201712651" isMe = {false} isFollow = {false}/>
        <Users id = "201712651" isMe = {false} isFollow = {true}/>*/}
        </div> );
    }
}
 
export default SearchUser;