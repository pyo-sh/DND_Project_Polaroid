import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import "./MainBanner.css"

const number = Math.floor(Math.random() * 2);
class MainBanner extends Component {
    state = {focus : false}

    handleFocus = () => { this.setState({ focus : true });}
    handleBlur = () => { this.setState({ focus : false });}

    render() {
        const {tag} = this.props;
        return (
            <div className = "Main-Banner">
                <img className="Main-Banner-Img" src={require(`../img/banner/banner${number}.jpg`)} alt = ""></img>
                <div className = "Main-Banner-Title">Graphic resources for everyone</div>
                <div className = "Main-Banner-Explanation">다양한 작가들의 작품을 즐겨보세요</div>
                <div className = {"Main-Banner-Search" + (this.state.focus ? " Focus" : "")} onFocus = {this.handleFocus} onBlur = {this.handleBlur}>
                    <input className = "Main-Banner-Search-Input"/>
                    <Icon className = "Icon-Search" name="search" size="large"/>
                </div>
                <span className = "Main-Banner-Tag">자주 찾는 태그 : {tag.map((v,index) => {
                    return <span key = {index}><a href="https://www.naver.com">{v}</a> </span>
                })} </span>
            </div>
        );
    }
}

export default MainBanner;