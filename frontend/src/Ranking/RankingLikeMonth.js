import React from 'react';
import './RankingLikeMonth.css';
import './RankingLike.css';
import './RankingFollowAll.css';
// import { getLikeMonthRanking } from './RakingFunction';

const RankingLikeMonth = ({monthLikeRanking}) => {
    return(
        <ol className = "Ranking-Box-Text">
            {monthLikeRanking.map((data, index) =>{
                return <li key={data.imgID} className="Ranking-Box-Ranking">{data.imgName}   좋아요 :{data.count}</li>
            })}
        </ol>
          
    )
}
export default RankingLikeMonth;