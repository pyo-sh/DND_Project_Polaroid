import React, { Component } from 'react';
import Ranking from '../Ranking/Ranking';

class SideContent extends Component {
    render() {
        return (
            <div className = "Side-Content">
                <Ranking title="Ranking"/>
            </div>
        );
    }
}

export default SideContent;