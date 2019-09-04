import './MyFilmBtn.css';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class MyFilmBtn extends Component{
    render(){
        return (
            <button 
                className="MyFilmBtn"
                onClick={this.onClickFilm}>필름 충전!
            </button>
        );
    }
    onClickFilm = () => {
        this.props.history.push('/film/charge');
    }
}
export default withRouter(MyFilmBtn);