import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import './Mark.css';

class FolderListItem extends Component {

    render(){
        return(
            <div className="Mark-Item-Display" onClick={() => this.props.onToggle(this.props.favFolderNum)}>
                <div>
                    <div>{this.props.favFolderName}</div>
                </div>
                <div className="Check-Mark">
                {
                    this.props.checked && (<Icon name="check" />)
                }
                </div>
            </div>
        )
    }
}

export default FolderListItem;