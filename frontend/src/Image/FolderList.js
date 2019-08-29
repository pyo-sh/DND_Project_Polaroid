import React, { Component } from 'react';
import FolderListItem from './FolderListItem';
import './Mark.css';

class FolderList extends Component {
    render(){

        const folderList = this.props.folder.map(
            ({id, text, checked}) => (
                <FolderListItem 
                    id={id}
                    text={text}
                    checked={checked}
                    key={id}
                    onToggle={this.props.onToggle}
                />
            )
        )

        return(
            <div>
                <div className="Mark-Item">
                    기본 폴더 <div className="check-mark">✓</div>
                </div>
                {folderList}
            </div>
        )
    }
}

export default FolderList;