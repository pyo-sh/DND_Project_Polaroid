import React, { Component } from 'react';
import MainBanner from './MainBanner';
import Photos from './Photos';
import SideContent from './SideContent';

class Home extends Component {
    state = {
        tag : ["하늘", "동물", "배경"],
    }
    render() {
        const { tag } = this.state;
        return (
            <div >
                <MainBanner tag={tag} />
                <div className="Content App" style={{ display: "flex", marginTop: "30px" }}>
                    <div className = "App-Left"> <Photos /> </div>
                    <div className = "App-Right"> <SideContent /> </div>
                </div>
            </div>
        );
    }
}

export default Home;