import React, { Component } from 'react';
import './Photos.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { CSSGrid, measureItems, makeResponsive,layout } from 'react-stonecutter';

class Photos extends Component {
    state = {
        images: [],
        count: 30, //한번에 사진 30개씩 부름
        start: 0,
        isMore : true
      };
    
    componentDidMount() {
      const { count, start } = this.state;
      // axios.get(`/api/file/photos`,{count,start})
      //   .then(response => {
      //     this.setState({ images: response.data.photos })
      //   })
      //   .catch(err => console.error(err))
      axios.get(`/api/images/getAllImagesTag?start=${start}&count=${count}`).then(res=>{
        console.log(res.data);
        this.setState({images : res.data});
        console.log(res.data);
      })
    }
    
    fetchImages = () => {
      console.log("as");
      const count = this.state.count,
            start = count + this.state.start;
      this.setState({ start: start });
      
      axios.get(`/api/images/getAllImagesTag?start=${start}&count=${count}`)
      .then(res=>{
        this.setState({ images: this.state.images.concat(res.data)}) // 이즈 모얼인가 뭐 해줘야함.
      })
      //  axios.post(`/api/file/photos`,{count,start})
      //   .then(response => {
         
      //   })
      .catch(err => console.error(err))
     }
    
    render() {
      const Grid = makeResponsive(measureItems(CSSGrid, {measureImages :  true }), {
<<<<<<< HEAD
        maxWidth: (this.props.mypage ? 960 : 1500)
=======
        maxWidth: 1006
>>>>>>> lee
      });

        return (
            <div className = "Photos">   
                  {/* <InfiniteScroll dataLength = {this.state.images.length} next = {this.fetchImages} hasMore = {this.state.isMore}>
                    <Grid className = "Photos-Grid" component="ul" columnWidth={(this.props.mypage ? 310 : 395)} gutterWidth = {5} gutterHeight = {5} layout = {layout.pinterest} duration = {0}>
                      {this.state.images.map((image, index) => (
                        <li key = {index} >
                            <Link to = {`/imagepage/${image.imgName}`}>
                              <img className = "Photos-photo" src={require(`../img/photo/${image.imgName}`)} alt=""/>
                            </Link>
                        </li>
                      ))}
                    </Grid>
                </InfiniteScroll> */}
                <InfiniteScroll dataLength = {this.state.images.length} next = {this.fetchImages} hasMore = {this.state.isMore} >
                    <Grid className = "Photos-Grid" component="ul" columnWidth={(this.props.mypage ? 310 : 395)} gutterWidth = {5} gutterHeight = {5} layout = {layout.pinterest} duration = {0}>
                      {this.state.images.map((image) => (
                        <li key = {image.imgID} >
                            <Link to = {`/imagepage/${image.imgID}`}>
                              <img className = "Photos-photo" src={image.imgUrl} alt="이미지"/>
                            </Link>
                        </li>
                      ))}
                    </Grid>
                </InfiniteScroll>
            </div>
        );
    }
  }

export default Photos;
