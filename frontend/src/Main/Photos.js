import React, { Component } from 'react';
import './Photos.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { CSSGrid, measureItems, makeResponsive,layout } from 'react-stonecutter';
import { withRouter } from 'react-router-dom';

class Photos extends Component {
    state = {
        images: [],
        searchimages: [],
        categoryimages: [],
        count: 30, //한번에 사진 30개씩 부름
        start: 0,
        isMore : true,
        outputType : 'home'
      };
    componentDidMount() {
      const { count, start } = this.state;
      if(this.props.location.pathname.includes("category")){
        this.setState({
          outputType : "category"
        })
      }else if(this.props.location.pathname.includes("search")){
        this.setState({
          outputType: "search"
        })
      }
      else this.setState({
        outputType : "home"
      })
      
     
      axios.get(`/api/images/getAllImagesCategory?start=${start}&count=${count}`).then(res=>{
        this.setState({images : res.data});
        if(this.props.search){
          this.searchContrast();
        }
        if(this.props.category){
          this.cateContrast();
        }
      })
    }
    componentDidUpdate(prevProps, prevState) { // 서치 값이 달라지면 다시 contrast 하게
      if(prevProps.outputType !== this.props.outputType) {
        this.setState({
          outputType : this.props.outputType
        })
      }
      if(prevProps.search !== this.props.search){
        this.searchContrast();
      } else if(prevProps.category !== this.props.category){
        this.cateContrast();
      }
    }

    fetchImages = () => {
      const count = this.state.count,
            start = count + this.state.start;
      this.setState({ start: start });
      
      axios.get(`/api/images/getAllImagesCategory?start=${start}&count=${count}`)
      .then(res=>{
        this.setState({ images: this.state.images.concat(res.data)}) // 이즈 모얼인가 뭐 해줘야함.
      })
      //  axios.post(`/api/file/photos`,{count,start})
      //   .then(response => {
         
      //   })
      .catch(err => console.error(err))
     }

     searchContrast = () => {
      let { search } = this.props;
      let searchimages = this.state.images.filter(searchimage => {
          let temp = searchimage.tag.split(',');
          return temp.includes(search)
      })
      this.setState({
          searchimages
      })
      let legnth = searchimages.length
      this.props.getPhotoCount(legnth)
    }

    cateContrast = () => {
      let { category } = this.props;
      let categoryimages = this.state.images.filter(categoryimage => categoryimage.category.includes(category))
      this.setState({
          categoryimages
      })
    }
   
    render() {
      const Grid = makeResponsive(measureItems(CSSGrid, {measureImages :  true }), {
        maxWidth: 1006
      });
      const {outputType} = this.state

        return (
            <div className = "Photos">   
                <InfiniteScroll dataLength = {this.state.images.length} next = {this.fetchImages} hasMore = {this.state.isMore} >
                    <Grid className = "Photos-Grid" component="ul" columnWidth={330} gutterWidth = {5} gutterHeight = {5} layout = {layout.pinterest} duration = {0}>
                    {outputType === "home" ?  
                        this.state.images.map((image) => (
                              <li key = {image.imgID} >
                                  <Link to = {`/imagepage/${image.imgID}`}>
                                    <img className = "Photos-photo" src={image.imgUrl} alt="이미지"/>
                                  </Link>
                              </li>
                        ))  :
                        (outputType === "search" ? 
                        this.state.searchimages.map((image) => (
                          <li key = {image.imgID} >
                              <Link to = {`/imagepage/${image.imgID}`}>
                                <img className = "Photos-photo" src={image.imgUrl} alt="이미지"/>
                              </Link>
                          </li>
                        )) : 
                        this.state.categoryimages.map((image) => (
                          <li key = {image.imgID} >
                              <Link to = {`/imagepage/${image.imgID}`}>
                                <img className = "Photos-photo" src={image.imgUrl} alt="이미지"/>
                              </Link>
                          </li>
                        )))}
                      
                    </Grid>
                </InfiniteScroll>
            </div>
        );
    }
  }

export default withRouter(Photos);
