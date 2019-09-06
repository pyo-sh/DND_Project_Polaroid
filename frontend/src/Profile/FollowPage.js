import './FollowPage.css';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import ProfileSmall from './ProfileSmall';
import { getMyID, getFollowingSome, getFollowerSome } from './ProfileFunction'

class FollowPage extends Component {
    state={
        id: "", // 현재 로그인 된 아이디
        targetID: "", // 대상의 아이디
        // true : following, false : follower
        isFollow: true,
        // 여기까진 id(자신)의 follower와 following 사람들의 리스트
        countID: [], // 출력을 해야하는 id 목록들, 30개씩 붙인다.
        count: 30, // 한 번의 스크롤에 불러올 id의 갯수
        start: 0,
        isMore : true
    }

    componentWillMount(){
        const id = getMyID();
        const {targetID, isFollow} = this.props;
        this.setState({
            id: id,
            targetID: targetID,
            isFollow: isFollow
        });
    }
    componentDidMount() {
        const { targetID, isFollow, count, start } = this.state;
        if(isFollow){
            getFollowingSome(targetID, start, count).then(res => {
                this.setState({
                    countID: this.state.countID.concat(res.data)
                })
            });
        }
        else{
            getFollowerSome(targetID, start, count).then(res => {
                this.setState({
                    countID: this.state.countID.concat(res.data)
                })
            });
        }
    }

    fetchIDs = () => {
        const count = this.state.count;
        const start = count + this.state.start;
        this.setState({ start: start });
    }

    setDatas = () => {
        
    }

    _renderFollow = () => {
        
    }

    render() {
        const { isFollow } = this.state;
        return (
            <div className="FollowPage">
                <div className="FollowPage-Top">
                    {isFollow===true ? "Following" : "Follower"}
                </div>
                <InfiniteScroll
                    dataLength = {this.state.countID.length}
                    next = {this.fetchIDs}
                    hasMore = {this.state.isMore}
                    >
                    {this.state.countID.map((list, index) => (
                        <li key = {index} >
                            <Link to = {isFollow===true ? `/${list.followerID}` :  `/${list.followID}`}>
                                <ProfileSmall id={isFollow===true ? list.followerID : list.followID}/>
                            </Link>
                        </li>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default FollowPage;