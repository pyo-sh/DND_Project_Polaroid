import './MyProfile.css';
import LinesEllipsis from 'react-lines-ellipsis';
import MyProfileGrade from './MyProfileGrade';
import React, { Component } from 'react';

class MyProfile extends Component {
    state = this.props.profile;
    componentDidUpdate(prevProps, prevState){
        if(prevProps.profile !== this.props.profile){
            const {id, name, about, photo, follower, following, benefit} = this.props.profile;
            this.setState({
                id,
                name,
                about,
                photo,
                follower,
                following,
                benefit
            })
        }
    }   
    render() {
        return (
                <Profile 
                    photo={this.state.photo}
                    name={this.state.name}
                    id={this.state.id}
                    about={this.state.about}
                    following={this.state.following}
                    follower={this.state.follower}
                    grade={this.state.grade}
                    />
        );
    }
}

const Profile = ({photo, name, id, about, following, follower, grade}) => {
    return(
        <div className="Profile">
            <div className="Profile-Status">
                <ProfilePhoto photo = {photo}/>
                <MyProfileGrade name = {name} grade = {grade}/>
            </div>
            <div className="Profile-Columns">
                <div className="Profile-Private">
                    <strong className="Profile-Name">{name}</strong>
                    <span className="Profile-Id">{id}</span>
                </div>
                <div className="Profile-About">
                    <LinesEllipsis
                        text={about}
                        maxLine='5'
                        ellipsis=' ...'
                        trimRight
                        basedOn='letters'
                        />
                </div>
                <div className="Profile-Service">
                    <div className="Profile-Following">{following} 팔로잉 </div>
                    <div className="Profile-Follower">{follower} 팔로워 </div>
                </div>
            </div>
        </div>
    )
}
 
const ProfilePhoto = ({photo}) => {
    return(
        <img className="Profile-Photo" src={photo} alt="Profile"/>
    )
}

export default MyProfile;