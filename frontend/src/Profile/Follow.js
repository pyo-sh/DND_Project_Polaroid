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
        // 여기까진 id(자신)의 follower와 following 사람들의 리스트

        targetID: "",
        countID: [], // 출력을 해야하는 id 목록들, 30개씩 붙인다.
        count: 30, // 한 번의 스크롤에 불러올 id의 갯수
        start: 0,
        end: 29, // countID에 들어가야 할 배열의 부분
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

        this.setState({ followingID: getFollowingInfo(id) });
        if(!this.state.isFollow){
            this.setState({ followerID: getFollowerInfo(id) });
            this.setState({ countID: countID.concat() });
        }
    }

    fetchIDs = () => {
        const {count, start, end} = this.state;
        // const start = count + this.state.start;
        // this.setState({ start: start });
        this.setDatas();
        if(this.state.isFollow)
            this.setState({ countID: this.state.countID.concat(this.state.followingID.slice(start, end)),
                            isMore : response.data.isMore});
        else
            this.setState({ countID: this.state.countID.concat(this.state.followerID.slice(start, end)),
                            isMore : response.data.isMore});
    }

    componentDidMount() {
        const { count, start } = this.state;
        axios.post(`/api/file/photos`,{count,start})
          .then(response => {
            this.setState({ images: response.data.photos})
          })
          .catch(err => console.error(err))
      }
    fetchImages = () => {
        const count = this.state.count,
              start = count + this.state.start;
        this.setState({ start: start });
   
        axios.post(`/api/file/photos`,{count,start})
          .then(response => {
            this.setState({ images: this.state.images.concat(response.data.photos),
                            isMore : response.data.isMore})
          })
          .catch(err => console.error(err))
       }

    setDatas = () => {
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