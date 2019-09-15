import React from 'react';
import {Link} from 'react-router-dom';
import "./MainPhoto.css";

function MainPhoto(){
        return (
            <>
                <div className ="Main-Left-Photo" style = {{ backgroundImage : `url(${require(`../img/photo/photo31.jpg`)})`}}/>
                <div className ="Main-Left-Photo-Explanation">
                    <Link to="/">
                        <div className = "Main-Left-Photo-Column">
                            <img className ="Main-Left-Logo" src = {require('../img/Logo_white.svg')} alt = 'Logo'/>
                            <h1 className = "Main-Left-Photo-Title"> Polaroid </h1>
                        </div>
                    </Link>
                    <p>이곳에서는 누구나 작가가 될 수 있습니다.</p>
                    <p>당신의 작품 활동을 응원합니다.</p>
                </div>
            </>
        )
    
  }

  export default MainPhoto;
  