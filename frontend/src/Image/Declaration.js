import React, { Component } from 'react';
import './Declaration.css';

class Declaration extends Component{
    render(){
        return(
            <React.Fragment>
            {
                this.props.isOpen ?
                <React.Fragment>
                    <div className="Declaration-Modal-Overlay" onClick={this.props.close} />
                    <div className="Declaration-Modal">
                        <h3 className="Declaration-Title">신고하시겠습니까?</h3>
                        <div className="Declaration-Content">
                            대충 신고하겠냐는 말    
                        </div>
                        <div className="Declaration-Button-Wrap">
                            <button className="Declaration-Button1" onClick={this.props.close}>CANCEL</button>
                            <button className="Declaration-Button2" onClick={this.props.close}>CONFIRM</button>
                        </div>
                    </div>
                </React.Fragment>

                :
                null
            }
        </React.Fragment>
        )
    }
}

export default Declaration;