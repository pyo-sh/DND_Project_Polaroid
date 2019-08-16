import React, { Component } from 'react';

class practice extends Component {
    handleClick = () => {
        console.dir(e);
        console.log(e.target);
        console.dir(e.target);
    }

    render() {
        return (
            <div>
              <button onClick={this.handleClick}></button>  
            </div>
        );
    }
}

export default practice;