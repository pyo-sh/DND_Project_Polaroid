import React from 'react';
import "./MainPhoto.css";

function MainPhoto(){
        return (
            <div className ="Main-Left-Photo" style = {{ backgroundImage : `url(${require(`../img/photo/photo31.jpg`)})`}}>
                <div className ="Main-Left-Photo-Explanation">
                    <div className = "Main-Left-Photo-title">Polaroid</div>
                    <p>누구나 작가가 될 수 있습니다.</p>
                    <p>당신의 작품을 응원합니다.</p>
                </div>
            </div>
        )
    
  }

  export default MainPhoto;
  