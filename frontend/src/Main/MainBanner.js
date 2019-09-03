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
            <div className = "Main-Banner" style = {{ backgroundImage : `url(${require(`../img/banner/banner${number}.jpg`)})`}}>
                <div className="Main-Banner-Box" >
                <div className = "Main-Banner-Title">Graphic resources for everyone</div>
                <div className = "Main-Banner-Explanation">다양한 작가들의 작품을 즐겨보세요.</div>
                <input className = "Main-Banner-Input"></input>
                <span className = "Main-Banner-Tag">자주 찾는 태그 : {tag.map((v,index) => {
                    return <span key = {index}><a href="https://www.naver.com">{v}</a> </span>
                })} </span>
                </div>
            </div>
        );
    }
}

export default MainBanner;