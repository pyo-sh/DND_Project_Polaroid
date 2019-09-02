import React, {Component} from 'react';
import './RankingLikeMonth.css';
import './RankingLike.css';
import './RankingFollowAll.css';

class RankingLikeMonth extends Component{
    render(){
        return(
            <ol className = "Ranking-Box-Text">
                <li className="Ranking-Box-Ranking">최정은 619</li>
                <li className="Ranking-Box-Ranking">정은이 528</li>
                <li className="Ranking-Box-Ranking">둉은이 367</li>
                <li className="Ranking-Box-Ranking">으아아 122</li>
                <li className="Ranking-Box-Ranking">으어어 15</li>
            </ol>
              
        )
    }
}   

export default RankingLikeMonth;