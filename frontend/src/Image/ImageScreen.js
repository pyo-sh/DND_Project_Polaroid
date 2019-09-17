import React, {Component} from 'react';
import Image from './Image';
import ImageInfo from './ImageInfo';

const im = ["https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492__340.jpg",
"https://img.freepik.com/free-vector/trendy-seamless-floral-pattern-vector-illustration_1305-2422.jpg?size=626&ext=jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvNPtYLsC4TWqXnYrWT2nWAaJQjXWfcu0Qog4WUsBX3L6I8Vs5",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffdlwQgYF5gUQwbmt6aAcYmtuD7eeDcVAsB5XzsYP29zhpmmk"];


class ImageScreen extends Component {
  state = { 
    payment : false
  }

  onClick = () =>{
    this.setState({
      payment : !this.state.payment
    })
  }
  
  render(){
    return (
      <div className="Content">
        <div className = "Content-Left">
          <Image 
            // id = "1"
            // tags = {this.state.image[0].tags} 
            // type = {this.state.image[0].type} 
            // uploadDate = {this.state.image[0].uploadDate} 
            // downloade = {this.state.image[0].downloade} 
            // kategorie = {this.state.image[0].kategorie} 
            // like = {this.state.image[0].like} 
            // isLike = {this.state.image[0].isLike} 
            // view = {this.state.image[0].view} 
            // size = {this.state.image[0].size}
            // key = {this.state.image[0].id} 
            />
        </div>
        <div className = "Content-Right">
          <ImageInfo 
            // registrant = {this.state.image[0].registrant}
            // paid = {this.state.image[0].paid}
            // type = {this.state.image[0].type}
            // size = {this.state.image[0].size}
            // uploadDate = {this.state.image[0].uploadDate}
            // download = {this.state.image[0].download}
            // kategorie = {this.state.image[0].kategorie}
            // tags = {this.state.image[0].tags}
          //  }/>
           payment= {this.state.payment}
            handlePayment={this.onClick}
            />
        </div>
      </div>
    );
  }
}

export default ImageScreen;
