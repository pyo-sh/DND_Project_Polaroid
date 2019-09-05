import './Follow.css';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFollowingInfo, getFollowerInfo } from './ProfileFunction'

class Follow extends Component {
    state={
        id: "", // 현재 로그인 된 아이디
        targetID: "", // 대상의 아이디
        followingID: [],
        // true : following, false : follower
        isFollow: true,
        followerID: [],
        // 여기까진 id(자신)의 follower와 following 사람들의 리스트

        targetID: "",
        countID: [], // 출력을 해야하는 id 목록들, 30개씩 붙인다.
        count: 30, // 한 번의 스크롤에 불러올 id의 갯수
        start: 0,
        isMore : true
    }

    // render 하기전에, state 값으로 id, isFollow를 setState한다. (id와 isFollow는 값을 받는데 필요한 값들이기 때문.)
    componentWillMount(){
        const { id, targetID, isFollow } = this.props;
        this.setState({
            id: id,
            isFollow: isFollow,
            targetID: targetID
        });
        console.log(this.state.id);
        console.log(this.state.isFollow);
        console.log(this.state.targetID);
    }

    // id 값으로, Following 값과 Follower 값을 받아야 함.
    componentDidMount() {
        const { id, isFollow, countID } = this.state;
        console.log(id);
        console.log(isFollow);
        console.log(this.state.targetID);
    }

    fetchIDs = () => {
        
    }

    setDatas = () => {
        
    }

    render() {
        return (
            <div className="Follow">
                <InfiniteScroll dataLength = {this.state.countID.length} next = {this.fetchIDs} hasMore = {this.state.isMore}>
                    {this.state.countID.map((id, index) => (
                        <li key = {index} >
                            <Link to = {`/${id}`}>
                                <ProfileSmall id={id}/>
                            </Link>
                        </li>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default Follow;