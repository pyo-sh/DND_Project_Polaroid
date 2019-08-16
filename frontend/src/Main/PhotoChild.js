import React from 'react';
import { Link } from 'react-router-dom';
 
const PhotoChild = ({img}) => {
    return (
        <Link to ="/imagepage"><img className = "Photo-Box-Img" src={require(`../img/photo/${img}`)} alt=""></img></Link>
    );
};

export default PhotoChild;