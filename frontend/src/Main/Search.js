import React, {Component} from 'react';
import Photos from './Photos';
import SideContent from './SideContent';

class Search extends Component {
    upperTitle(){
        let title = this.props.match.params.category;
        title = title.replace('-',' ');
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    render(){
        return (
            <div className = "Category">
                <div className = "Category-Information">
                    <div className = "Title">{this.props.match.params.search}</div>
                </div>
                <div className = "Content" id = "content-category">
                    <div className = "Content-Left"><Photos category = {this.props.match.params.category}/></div>
                    <div className = "Content-Right"> <SideContent category = {this.props.match.params.category}/> </div>
                </div>
            </div>
        )
    }
}

export default Search;