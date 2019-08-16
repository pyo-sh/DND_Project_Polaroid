import React, {Component} from 'react';
import './ImageScreen.css';
import Image from './Image';
import ImageInfo from './ImageInfo';

const im = ["https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492__340.jpg",
"https://img.freepik.com/free-vector/trendy-seamless-floral-pattern-vector-illustration_1305-2422.jpg?size=626&ext=jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvNPtYLsC4TWqXnYrWT2nWAaJQjXWfcu0Qog4WUsBX3L6I8Vs5",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffdlwQgYF5gUQwbmt6aAcYmtuD7eeDcVAsB5XzsYP29zhpmmk"];


class ImageScreen extends Component {
  state = {
    image : [{
      id : "0",
      tags : ["풍경", "하늘", "푸른"],
      registrant : {
        profileImage : im[0],
        nickname : "이 은비",
        id : "she2325",
        follow : false
      },
      type : "jpg",
      uploadDate : "2019.2.8",
      downloade : "1594",
      kategorie : "Nature",
      like : "56",
      isLike : false,
      veiw : "45",
      size : "가로 X 세로",
      mark : true,
      paid : true
    },{
      id : "1",
      tags : ["풍경","하늘", "태그"],
      registrant : {
        profileImage : null,
        nickname : "Lihess",
        id : "lihess"
      },
      type : "jpg",
      uploadDate : "2019.2.8",
      downloade : "1594",
      kategorie : "카테고리",
      like : "564",
      isLike : true,
      veiw : "456",
      size : "가로 X 세로",
      paid : false
    },{
      id : "2",
      tags : ["야자수", "하늘", "밝은"],
      registrant : {
        profileImage : im[3],
        nickname : "Hong",
        id : "hong",
        follow : true
      },
      type : "jpg",
      uploadDate : "2019.2.8",
      downloade : "1594",
      kategorie : "Nature",
      like : "564",
      isLike : true,
      veiw : "4558",
      size : "가로 X 세로",
      mark : true,
      paid : false
    }]
  }
  
  render(){
    return (
      <div className="App">
        <div className = "App-Left">
          <Image 
            id = {this.state.image[0].id} 
            tags = {this.state.image[0].tags} 
            type = {this.state.image[0].type} 
            uploadDate = {this.state.image[0].uploadDate} 
            downloade = {this.state.image[0].downloade} 
            kategorie = {this.state.image[0].kategorie} 
            like = {this.state.image[0].like} 
            isLike = {this.state.image[0].isLike} 
            veiw = {this.state.image[0].veiw} 
            size = {this.state.image[0].size} 
            mark = {this.state.image[0].mark} 
            key = {this.state.image[0].id} />
        </div>
        <div className = "App-Right">
          <ImageInfo 
            registrant = {this.state.image[0].registrant}
            paid = {this.state.image[0].paid}
            type = {this.state.image[0].type}
            size = {this.state.image[0].size}
            uploadDate = {this.state.image[0].uploadDate}
            downloade = {this.state.image[0].downloade}
            kategorie = {this.state.image[0].kategorie}
            tags = {this.state.image[0].tags}/>
        </div>
      </div>
    );
  }
}

export default ImageScreen;
