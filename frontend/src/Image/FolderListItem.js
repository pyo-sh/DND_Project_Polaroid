import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import './Mark.css';

class FolderListItem extends Component {
    render(){
        return(
            <div className="Mark-Item-Display" onClick={() => this.props.onToggle(this.props.id)}>
                <div>
                    <div>{this.props.folderIcon}{this.props.text}</div>
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