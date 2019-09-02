import React, {Component} from 'react';
import './RankingFollowAll.css';
import './RankingLike.css';
import { getRanking } from './RakingFunction'
class RankingFollowAll extends Component{
    state ={
        ranking : []
    }
    componentDidMount(){
        getRanking()
        .then(res => {
            this.setState({
                ranking: res
            })
        })
    }
    render(){
        const { ranking } = this.state;
        return(
            <ol className = "Ranking-Box-Text">
              {ranking.map((user, index) => {
                  return <li className ="Ranking-Box-Ranking" key = {index}>{user.userNickname} {user.userfollower}</li>
              })}
            </ol>
              
        )
    }
}   

export default RankingFollowAll;