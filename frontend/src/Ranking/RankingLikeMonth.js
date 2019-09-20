import React from 'react';
import './RankingLike.css';
import './RankingFollowAll.css';
import {Link} from 'react-router-dom';

const RankingLikeMonth = ({monthLikeRanking}) => {
    return(
        <ol className = "Ranking-Box-Text">
            {monthLikeRanking.map((data, index) =>{
                return (
                    <Link to = {`/imagepage/${data.imgID}`}>
                        <li key={data.imgID} className="Ranking-Box-Ranking">
                            <img src = {`https://poloapp.s3.ap-northeast-2.amazonaws.com/image/${data.imgID}`}  alt = ''/> 
                            <div className = "Ranking-Id">{'@' + data.userID}</div>
                       </li>
                    </Link>
                    );
                }
            )}
        </ol>
          
    )
}
export default RankingLikeMonth;