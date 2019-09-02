import React from 'react';
import PropTypes from 'prop-types';
import './ProfileSmall.css';
import history from './history';

ProfileSmall.propTypes = {
    profileImage : PropTypes.string,
    nickname : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired,
    image : PropTypes.shape({
        image : PropTypes.string.isRequired,
        alt : PropTypes.string.isRequired
    }),
    follow : PropTypes.bool
}

ProfileImage.propTypes = {
    profileImage : PropTypes.string,
    alt : PropTypes.string.isRequired
}

Image.propTypes = {
    image : PropTypes.shape({
        image : PropTypes.string,
        alt : PropTypes.string
    })
}

FollowButton.propTypes = {
   follow : PropTypes.bool
}

// 이동 페이지는 임시

function ProfileSmall({profileImage, nickname, id, images, follow}){
    return ( 
        <div className = "Profile-Small">
            <div className = "Profile-Column">
                <div className = "Profile-ProfileImage" onClick = {() => history.push(`/Profile/${id}`)}>
                    <ProfileImage profileImage = {profileImage} alt = {nickname}/>
                </div>
                <div className = "Profile-Info">
                    <span className = "Nickname"> {nickname} </span>
                    <span className = "Id"> {"@" + id} </span>
                </div>
                { follow != null &&
                    <div className = "Follow-Btn">
                        <FollowButton follow = {follow}/>
                    </div>
                }
            </div>
            <div className = "Profile-Column">
                {images.map((image, index) => <Image image = {image} key = {index}/>)}
            </div>
        </div>
     );
}


function ProfileImage({profileImage, alt}){
    return (
        <img src = {profileImage ? profileImage : "https://postfiles.pstatic.net/MjAxOTA3MzBfMjgy/MDAxNTY0NDkxNDIxOTA3.PDvjdx3QnWA0Bty0KXQAd9IBixEYYBZ7vk3UfijmqlQg.lWtF8Jrtmh-Kv4hra3IXNlY4z3I15DpiPkdh6NiGLC0g.PNG.she2325/%E3%85%81%E3%85%82.png?type=w966"} alt = {alt}></img>
    ); // 프로필 사진이 없으면 검게 나오도록, 후에 사진 id로 대체하여 데이터랑 연결될 예정
}

function Image({image}){
    return(
            <div className = "Image" style = {{ backgroundImage : `url(${image.image})`}} onClick = "">
            </div>
    );
}

function FollowButton({follow}){
    const handleClick = (e) => {
        e.preventDefault();
        // follow 역전하는 코드
    }
    return(
        <button className = {follow === true ? "Following" : "Follow"} onClick = {handleClick}>
            {follow  === true? "Following" : "Follow"}
        </button>
    );
}

export default ProfileSmall;