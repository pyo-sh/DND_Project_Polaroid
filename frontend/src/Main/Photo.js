import React from 'react';
import { Link } from 'react-router-dom';
import './Photo.css';

function Photo({image}){
    return (
        <Link to ="/imagepage"><img className = "Photo" src={require(`../img/photo/${image}`)} alt=""/></Link>
    );
    
}

export default Photo;

