import React, { Component } from 'react';
import './MyPagePhotos.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { CSSGrid, measureItems, makeResponsive,layout } from 'react-stonecutter';

class MyPagePhotos extends Component {
    state = {
        images: [],
        countImages: [],
        start: 0,
        count: 30, //한번에 사진 30개씩 부름
        isMore : true,
        outputType : "home"
      };
    componentDidMount(){
        const { start, count } = this.state;
        const { id, outputType } = this.props;
        if(outputType.includes("UPLOAD")){
            this.fetchUploadImages(id, start, count);
        }
        else if(outputType.includes("DOWNLOAD")){
            
        }
        else if(outputType.includes("LIKED")){
            
        }
        else{
            
        }
        this.setState({
          outputType : outputType
        })
    }

    fetchUploadImages = (id, start, count) => {
        let { images, countImages, isMore } = this.state;
        axios.get(`/api/images/getAllImagesUser?start=${start}&count=${count}`).then(res => {
            // 받아온 이미지의 배열 길이가 30 이 아니면 더이상 불러올 필요가 없지.
            if(res.data.length !== 30){
                isMore = false;
                this.setState({
                    isMore: isMore
                });
            }
            res.data.map((result) => {
                if(result.userID === id){
                    countImages = countImages.concat(result);
                }
            })
            images = images.concat(res.data);
            this.setState({
                images: images,
                countImages: countImages
            });
        })
        this.setState({
            start: start + count,
        })
    }

    renderGrid = () => {
        const { countImages, isMore, outputType } = this.state;
        const Grid = makeResponsive(measureItems(CSSGrid, {measureImages :  true}), {
            maxWidth: 1006
        });
        switch(outputType) {
            case "UPLOAD" : return <InfiniteScroll dataLength = {countImages.length} next = {this.fetchUploadImages} hasMore = {isMore} >
                    <Grid className = "MyPagePhotos-Grid" component="ul" columnWidth={330} gutterWidth = {5} gutterHeight = {5} layout = {layout.pinterest} duration = {0}>
                        {countImages.map((image) => (
                            <li key = {image.imgID}>
                                <Link to = {`/imagepage/${image.imgID}`}>
                                    <img className = "MyPagePhotos-photo" src={image.imgUrl} alt="이미지"/>
                                </Link>
                            </li>
                        ))}
                    </Grid>
                </InfiniteScroll>
            case "DOWNLOADED" : return null;
            case "LIKED" : return null;
            default: return null;
        }
    }
   
    render() {
        return <div className = "MyPagePhotos">
                {this.renderGrid()}
            </div>;
    }
  }

export default MyPagePhotos;
