import React from 'react';
import './RankingLikeWeek.css';
import './RankingLike.css';
import './RankingFollowAll.css';

const RankingLikeWeek = ({weekLikeRanking}) => {
    return(
        <ol className = "Ranking-Box-Text">
            {weekLikeRanking.map((data, index) =>{
                return <li key={data.imgID} className="Ranking-Box-Ranking">{data.imgName}   좋아요 :{data.count}</li>
            })}
        </ol>
    )
}

export default RankingLikeWeek;