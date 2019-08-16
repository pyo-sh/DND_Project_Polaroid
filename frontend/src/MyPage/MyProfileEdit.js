import './MyProfileEdit.css';
import React, { Component } from 'react';

class MyProfileEdit extends Component {

    render() {
        return (
            <div className="MyProfile-Edit">
                <MyProfileEditTitle title = "프로필 사진" />
                <MyProfileEditPhoto photo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y"/>
                <MyProfileEditTitle title = "닉네임" />
                <MyProfileEditInput />
                
            </div>
        );
    }
}

const MyProfileEditTitle = ({title}) => {
    return(
        <div className="Edit-ThCell">
            {title}
        </div>
    );
};

const MyProfileEditPhoto = ({photo }) => {
    return(
        <div className="Edit-TdCell">
            <img className="Edit-Photo" src = {photo} alt = "Profile"/>
            <div className="Edit-Photo-Btn">
                <button>사진 변경</button>

            </div>
        </div>
    );
};

const MyProfileEditInput = () => {
    return(
        <div className = "Edit-TdCell">
            <input className = "Edit-TdCell-Input"></input>
        </div>
    );
};




export default MyProfileEdit;