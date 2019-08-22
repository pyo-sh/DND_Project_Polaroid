import React from 'react';
import RankingLike from './RankingLike';
import "./Ranking.css";
import RankingFollow from './RankingFollow';


const Ranking = ({title}) => {
    return (
        <div className = "Ranking-Main">
            <div className = "Ranking-Area">
                <RankingLike  title={title}/>
            </div>
            
            <div className = "Ranking-Area">
                <RankingFollow title={title} />
            </div>
           
        </div>
    );
};


export default Ranking;