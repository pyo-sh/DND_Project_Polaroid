import React from 'react';
import './Photo.css';

function Photo({image}){
    return (
        <img className = "Photo" src={require(`../img/photo/${image}`)} alt=""/>
    );
    
}

export default Photo;

