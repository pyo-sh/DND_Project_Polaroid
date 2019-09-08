import './MyFilm.css';
import { getAllInfo } from '../MyPage/MyPageFunction';
import jwt_decode from 'jwt-decode';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class MyFilm extends Component {
    state = {
        film: 0
    }
    componentDidMount(){
        if(localStorage.usertoken || sessionStorage.usertoken){
            this.getInfo();
        }

    }
    getInfo = () => {
        let token = '';
        localStorage.usertoken ? token = localStorage.getItem('usertoken') : token = sessionStorage.getItem('usertoken');
        const decode = jwt_decode(token);
        const ID = decode.ID;
        getAllInfo(ID).then(res=> {
            this.setState({
                film : res.film
            })
        })
        .catch(err => {
            console.error(err);
        })
    }
    render(){
        return(
            <div className="MyFilm">
                보유필름 :  
                <Link className = "Amount" to = "/film/charge"> {this.state.film ? this.state.film : "0"} </Link>
            </div>
        );
    }
}

export default MyFilm;
