import React, { Component } from 'react';
import './Photos.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { CSSGrid, measureItems, makeResponsive,layout } from 'react-stonecutter';

class SearchImage extends Component {
    state = {
        images: [],
        searchimages: [],
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
        this.setState({images : res.data});
        this.contrast();
      })
    }
    componentDidUpdate(prevProps, prevState) { // 서치 값이 달라지면 다시 contrast 하게
      if(prevProps.search !== this.props.search){
        this.contrast();
      }
    }

    fetchImages = () => {
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
    
    contrast = () => {
        let { search } = this.props;
        let searchimages = this.state.images.filter(searchimage => {
            let temp = searchimage.tag.split(',');
            return temp.includes(search)
        })
        this.setState({
            searchimages
        })
        this.props.getPhotoCount(searchimages.length)
    }

    render() {
      const Grid = makeResponsive(measureItems(CSSGrid, {measureImages :  true }), {
        maxWidth: 1006
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
                    <Grid className = "Photos-Grid" component="ul" columnWidth={330} gutterWidth = {5} gutterHeight = {5} layout = {layout.pinterest} duration = {0}>
                        {this.state.searchimages.map((image) => (
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

export default SearchImage;
