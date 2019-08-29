import React, {Component} from 'react';
import './RankingLikeWeek.css';
import './RankingLike.css';

class RankingLikeWeek extends Component{
    render(){
        return(
            
                <ol className = "Ranking-Box-Text">
                    <li className="Ranking-Box-Ranking">최정은 329</li>
                    <li className="Ranking-Box-Ranking">정은이 308</li>
                    <li className="Ranking-Box-Ranking">둉은이 158</li>
                    <li className="Ranking-Box-Ranking">으아아 126</li>
                    <li className="Ranking-Box-Ranking">으어어 9</li>
                </ol>
              
        )
    }
}   

export default RankingLikeWeek;