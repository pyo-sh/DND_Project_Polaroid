import './Follow.css';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { getFollowingInfo, getFollowerInfo } from './ProfileFunction'

class Follow extends Component {
    state={
        id: "",
        followingID: [],
        // true : following, false : follower
        isFollow: true,
        followerID: [],
        countID: [],
        count: 30,
        start: 0,
        end: 29,
        isMore : true
    }
    // render 하기전에, state 값으로 id, isFollow를 setState한다. (id와 isFollow는 값을 받는데 필요한 값들이기 때문.)
    componentWillMount(){
        const { id, isFollow } = this.props;
        this.setState({
            id: id,
            isFollow: isFollow
        });
        this.state.followingID.
        console.log(this.state.id);
        console.log(this.state.isFollow);
    }
    // id 값으로, Following 값과 Follower 값을 받아야 함.
    componentDidMount() {
        const { id, isFollow } = this.state;
        console.log(id);
        console.log(isFollow);

        this.setState({followingID: getFollowingInfo(id)});
        if(!this.state.isFollow)
            this.setState({followerID: getFollowerInfo(id)});
    }

    fetchIDs = () => {
        const {count, start, end} = this.state;
        // const start = count + this.state.start;
        // this.setState({ start: start });
        if(this.state.isFollow)
            this.setState({ countID: this.state.countID.concat(this.state.followingID.slice(start, end)),
                            isMore : response.data.isMore});
        else
            this.setState({ countID: this.state.countID.concat(this.state.followerID.slice(start, end)),
                            isMore : response.data.isMore});
        this.setState({
            start: count + start,
            end = count + end
        });
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