import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ProfileSmall.css';
import history from './history';
import { getAllInfo } from '../MyPage/MyPageFunction';


ProfileSmall.propTypes = {
    id : PropTypes.string.isRequired,
}

FollowButton.propTypes = {
   follow : PropTypes.bool
}

class ProfileSmall extends Component{
    state={
        id: "",
        follow: true,
        profile: {
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y",
            name: "",
            id: "",
            about: "",
            grade: "일반"
        }
    }

    componentWillMount(){
        const { id, follow } = this.props;
        this.setState({
            id: id,
            follow: follow
        });
    }

    componentDidMount(){
        this.getInfo();
    }

    getInfo = () => {
        const ID = this.state.id;
        console.log(id);
        getAllInfo(ID).then(res=> {
            this.setState({
                profile: {
                    ...this.state.profile,
                    id : ID,
                    name : res.nickname,
                    about : res.introduce,
                    grade : res.grade
                }
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    render(){
        const { follow } = this.state;
        const { photo, id, name, about, grade } = this.state.profile;
        return ( 
            <div className = "ProfileSmall">
                <div className = "ProfileSmall-Column">
                    <div className = "ProfileSmall-ProfileImage" onClick = {() => history.push(`/Profile/${id}`)}>
                        <ProfileImage photo = {photo} alt = {name}/>
                    </div>
                    <div className = "ProfileSmall-Info">
                        <span className = "Nickname"> {name} </span>
                        <span className = "Id"> {"@" + id} </span>
                    </div>
                    { follow != null &&
                        <div className = "ProfileSmall-Follow-Btn">
                            <FollowButton follow = {follow}/>
                        </div>
                    }
                </div>
                <div className = "ProfileSmall-Column">
                    {images.map((image, index) => <Image image = {image} key = {index}/>)}
                </div>
            </div>
         );
    }
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

const FollowButton = ({follow, handleClick}) => {
    return(
        <button className = {follow === true ? "Following" : "Follow"} onClick = {handleClick}>
            {follow  === true? "Following" : "Follow"}
        </button>
    );
}

export default ProfileSmall;