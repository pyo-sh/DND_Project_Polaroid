import React, { Component } from 'react';
import "./MainBanner.css"

class MainBanner extends Component {
    choicePhoto = () => {
        const number = Math.floor(Math.random() * 2);
        return number;
    }
    render() {
        const {tag} = this.props;
        let number= this.choicePhoto();
        return (
            <div className = "Main-Banner">
                <img className="Main-Banner-Img" src={require(`../img/banner/banner${number}.jpg`)} alt = ""></img>
                <div className = "Main-Banner-Title">Graphic resources for everyone</div>
                <input className = "Main-Banner-Input"></input>
                <span className = "Main-Banner-Tag">자주 찾는 태그 : {tag.map((v) => {
                    return <span><a href="https://www.naver.com">{v}</a> </span>
                })} </span>
            </div>
        );
    }
}

export default MainBanner;