import React, {Component} from 'react';
import SearchImage from './SearchImage';
import Photos from './Photos';
import SideContent from './SideContent';
import Users from '../Profile/ProfileSmall';
import SearchUser from './SearchUser.js';
import './ContentTop.css';

class Search extends Component {
    state = { searchList : "photos" };
    changeStatetoPhotos = () => {
        this.setState({searchList : "photos"});
    }

    changeStatetoUsers = () => {
        this.setState({searchList : "users"});
    }
    
    render(){
        return (
            <div className = "Content-Top">
                <div className = "Content-Top-Information">
                    <div className = "Title">{this.props.match.params.search}</div>
                    <div className = "Content-Top-Result">
                        <div className = {"Result-Photos" + ((this.state.searchList === "photos") ? " Color" : "")} onClick = {this.changeStatetoPhotos}> 55 Photos </div>
                        <div className = {"Result-Users" + ((this.state.searchList === "users") ? " Color" : "")} onClick = {this.changeStatetoUsers}> 55 Users </div>
                    </div>
                </div>
                <div className = "Content" id = "content-top-search">
                    <div className = "Content-Left">{this.state.searchList === "photos" ? <SearchImage search = {this.props.match.params.search} /> : <SearchUser/>}</div>
                    <div className = "Content-Right"> <SideContent/> </div>
                </div>
            </div>
        )
    }
}

export default Search;