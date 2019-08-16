import React, { Component } from 'react';
import Ranking from './Ranking';

class SideContent extends Component {
    render() {
        return (
            <div className = "Side-Content">
                <Ranking title="일일 랭킹" />
                <Ranking title = "인기 작가 랭킹"/>
            </div>
        );
    }
}

export default SideContent;