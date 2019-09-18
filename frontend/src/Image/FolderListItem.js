import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import './Mark.css';

class FolderListItem extends Component {
   
    render(){
        return(
            <div className={"Mark-Items"+ (this.props.checked ? " Check-Mark-Background" : '')} onClick={() => this.props.onToggle(this.props.favFolderNum)}>
                <Icon className = {"Icon-Folder" + (this.props.checked ? " Check-Mark" : '')} name = {this.props.checked ? "folder open" : "folder outline"}/>
                <div className={"Mark-Items-Item" + (this.props.checked ? " Check-Mark" : '')}> 
                    {this.props.favFolderName} <Icon className = "X" name = "x" />
                </div>
            </div>
        )
    }
}

export default FolderListItem;