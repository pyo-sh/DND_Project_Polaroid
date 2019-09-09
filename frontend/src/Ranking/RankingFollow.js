import React, { Component } from 'react';
import RankingFollowAll from './RankingFollowAll';
import './RankingFollow.css';

class RankingFollow extends Component{

    

    render(){
        //<ol> 부터 DB에서 좋아요 많은 것부터 받아와 순서대로 출력
        return(
            <div className = "Ranking-Box">
                <div className = "Ranking-Title">
                    <i className="followbtn fas fa-camera-retro"/>
                    인기 작가
                </div>
                
                <div className="Ranking-Box-Like">
                    <div className = "Ranking-Box-Menu">
                        <div className = "Ranking-Box-Left">
                            총 팔로워 랭킹
                        </div>
                    </div>  
                    <RankingFollowAll />
                </div>     
            </div>
        )
    }
}
export default RankingFollow;