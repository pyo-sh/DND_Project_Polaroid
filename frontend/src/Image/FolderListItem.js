import React, { Component } from 'react';
import './Mark.css';

class FolderListItem extends Component {
    render(){
        return(
            <div className="Mark-Item-Display" onClick={() => this.props.onToggle(this.props.id)}>
                <div>
                    <div>{this.props.folderIcon}{this.props.text}</div>
                </div>
                {
                    this.props.checked && (<div className="check-mark">✓</div>)
                }
                
            </div>
        )
    }
}

export default FolderListItem;