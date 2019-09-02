import './MyProfile.css';
import LinesEllipsis from 'react-lines-ellipsis';
import MyProfileGrade from './MyProfileGrade';
import React, { Component } from 'react';

class MyProfile extends Component { // 보유 필름을 내가 추가해봤음.
    state = this.props.profile;
    // render가 실행되고 난 뒤 현재 프롭스와 전의 프롭스를 비교해서, 바뀌었을 때 setState를 시킨다.
    componentDidUpdate(prevProps, prevState){
        if(prevProps.profile !== this.props.profile){
            const {id, name, about, photo, follower, following, benefit, film} = this.props.profile;
            this.setState({
                id,
                name,
                about,
                photo,
                follower,
                following,
                benefit,
                film
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
                    film={this.state.film}
                    // onClickFollowing={this.props.onClickFollowing}
                    // onClickFollower={this.props.onClickFollower}
                    />
        );
    }
}

const Profile = ({photo, name, id, about, following, follower, grade, film}) => {
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
                <span>보유 필름 : {film}</span>
                <div className="Profile-Service">
                    {/* 팔로잉 페이지와 팔로워 페이지를 따로 놓아서 홈페이지를 푸쉬하는 방법으로 만들 것임 props로 onClick을 받았음
                    onClick={onClickFollowing}  onClick={onClickFollower}*/}
                    <button className="Profile-Following">{following} 팔로잉 </button>
                    <button className="Profile-Follower">{follower} 팔로워 </button>
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