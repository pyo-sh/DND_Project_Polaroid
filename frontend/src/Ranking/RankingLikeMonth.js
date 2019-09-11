import React, {Component} from 'react';
import './RankingLikeMonth.css';
import './RankingLike.css';
import './RankingFollowAll.css';
import { getLikeMonthRanking } from './RakingFunction';

class RankingLikeMonth extends Component{
    state = {
        rank : []
    }
    componentDidMount() {
        getLikeMonthRanking().then(res=> {
            this.setState({
                rank : res
            })
            console.log(this.state);
        })
    }
    render(){
        const { rank } = this.state;
        return(
            <ol className = "Ranking-Box-Text">
                {/* <li className="Ranking-Box-Ranking">최정은 619</li>
                <li className="Ranking-Box-Ranking">정은이 528</li>
                <li className="Ranking-Box-Ranking">둉은이 367</li>
                <li className="Ranking-Box-Ranking">으아아 122</li>
                <li className="Ranking-Box-Ranking">으어어 15</li> */}
                {rank.map((data, index) =>{
                    return <li key={data.imgID} className="Ranking-Box-Ranking">{data.imgName}   좋아요 :{data.count}</li>
                })}
            </ol>
              
        )
    }
}   

export default RankingLikeMonth;