import React from 'react';
import './RankingFollowAll.css';
import './RankingLike.css';

const RankingFollowAll = ({allFollowRanking}) => {
    return(
        <ol className = "Ranking-Box-Text">
          {allFollowRanking.map((user, index) => {
              return <li className ="Ranking-Box-Ranking" key = {index}>{user.userNickname} {user.userfollower}</li>
          })}
        </ol>
          
    )
}
export default RankingFollowAll;