import React from 'react';
import PropTypes from 'prop-types';
import './ImageInfo.css';

ImageInfo.protoType = {
    registrant : {
        profileImage : PropTypes.string,
        nickname : PropTypes.string.isRequired,
        id : PropTypes.string.isRequired
    },
    paid : PropTypes.bool.isRequired,
    type : PropTypes.string.isRequired,
    size : PropTypes.string.isRequired,
    uploadDate : PropTypes.bool.isRequired,
    downloade : PropTypes.bool.isRequired,
    kategorie : PropTypes.bool.isRequired,
    tags : PropTypes.shape({
        tag : PropTypes.string.isRequired
    })
}

Registrant.protoType = {
    registrant : {
        profileImage : PropTypes.string,
        nickname : PropTypes.string.isRequired,
        id : PropTypes.string.isRequired
    }
}

function ImageInfo({registrant, paid, type, size, uploadDate, downloade, kategorie, tags}){
    return (
        <div className = "ImageInfo">
            <Registrant registrant = {registrant} />
            <div className = "ImageInfo-Column Download">
                <button className = {paid ? "Premium" : "Free"} onClick = ""> {paid ? "Premium Download" : "Free Download"} </button>
            </div>
            <div className = "ImageInfo-Column">
                <table className = "ImagInfo-Detail">
                    <tbody>
                        <tr>
                            <td>이미지 타입</td><td>{type}</td>
                        </tr>
                        <tr>
                            <td>사이즈</td><td>{size}</td>
                        </tr>
                        <tr>
                            <td> 업로드 날짜 </td><td>{uploadDate}</td>
                        </tr>
                        <tr>
                            <td> 다운로드 </td><td>{downloade}</td>
                        </tr>
                        <tr>
                            <td> 카테고리 </td><td>{kategorie}</td> 
                        </tr>
                        <tr>
                            <td> 태그 </td><td>{tags.map((tag) => ` ${tag}`)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Registrant({registrant}){
    return(
        <div className = "ImageInfo-Column Profile" onClick = "">
            <div className = "Profile-Image">
            <img src = {registrant.profileImage ? registrant.profileImage : "https://postfiles.pstatic.net/MjAxOTA3MzBfMjgy/MDAxNTY0NDkxNDIxOTA3.PDvjdx3QnWA0Bty0KXQAd9IBixEYYBZ7vk3UfijmqlQg.lWtF8Jrtmh-Kv4hra3IXNlY4z3I15DpiPkdh6NiGLC0g.PNG.she2325/%E3%85%81%E3%85%82.png?type=w966"} alt = {registrant.nickname}></img>
            </div>
            <div className = "Profile-Info">
                <span className = "Nickname"> {registrant.nickname} </span> 
                <span className = "Id"> {"@" + registrant.id} </span>
            </div>
                { registrant.follow != null &&
                    <div className = "Follow-Btn">
                        <button className = {registrant.follow === true ? "Following" : "Follow"} onClick = "">
                        {registrant.follow  === true? "Following" : "Follow"}
                        </button>
                    </div>
                }
        </div>
    );
}
export default ImageInfo;