import React, { Component } from 'react';
import MainBanner from './MainBanner';
import Photos from './Photos';
import SideContent from './SideContent';

class Home extends Component {
    state = {
        tag : ["하늘", "동물", "배경"],
        ranking : [],
    }

    render() {
        const { tag } = this.state;
        return (
            <div >
                <MainBanner tag={tag} />
                <div className="Content" style={{ display: "flex", marginTop: "50px",
                marginLeft:"20px", marginRight: "20px"}}>
                    <Photos />
                    <SideContent /> 
                </div>
            </div>
        );
    }
}

export default Home;