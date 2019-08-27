import React, { Component } from 'react';
import './Photo.css';

function Photo({image}){
    return (
        <img className = "Photo" src={image.urls.small} alt=""/>
    );
    
}

export default Photo;

