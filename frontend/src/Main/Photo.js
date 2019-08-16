import React, { Component } from 'react';
import PhotoChild from './PhotoChild';
import './Photo.css';

class Photo extends Component {
    render() {
        const {img} = this.props;
        return (
            <div className = "Photo-Box">
                {img.map((img,i) => {  // key 부분 인덱스 고쳐야함
                    return <PhotoChild key = {i}img = {img} />
                })}
            </div>
        );
    }
}

export default Photo;

