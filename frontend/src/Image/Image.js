import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import './Image.css';
import {Icon} from 'semantic-ui-react';
import Mark from './Mark';
import Declaration from './Declaration';
import { withRouter, Link } from 'react-router-dom';

const im = ["https://postfiles.pstatic.net/MjAxOTA3MzBfNyAg/MDAxNTY0NDkxMzU1MjYw.6PsoCMM-IhbyMp28iN-PGLiPRgFhUk85GP-iLWcQLsIg.qG9gNv0c480J1n8PkTKyD8SqKvkheTeFjVtuphz3CaEg.JPEG.she2325/7.jpg?type=w966",
"https://postfiles.pstatic.net/MjAxOTA3MzBfODgg/MDAxNTY0NDkxMzU0OTY3.1VS0WEhoUmxz31Yv_Fqn8hTz0b_PI67lgDJsn3u3igcg.IeT-JpGIgHGKxUR-exblUdRKTSHZCJhaHNFQMcqxzEMg.JPEG.she2325/8.jpg?type=w966",
"https://postfiles.pstatic.net/MjAxOTA3MzBfMTEg/MDAxNTY0NDkxMzU0ODY3.6eVSLBjwuAl2I_PZJl-rETOeIlCPLoH6Zd3BsRXu1LMg.WbPXfoyS3ACPaWJ73skzmsjnD1eHClaVgbpxAEw2cJ4g.JPEG.she2325/9.jpg?type=w966",
"https://postfiles.pstatic.net/MjAxOTA3MzBfMjA2/MDAxNTY0NDkxMzU1NDQ2.vY704r4pmlsPx_ijWiAWMCbNUBw101-pRDzUxh7vxX8g.K9VsOmd0BkLHn73-GrF2nLzh4n1KzZiH2eoPfKHiWOAg.JPEG.she2325/11.jpg?type=w966",
"https://postfiles.pstatic.net/MjAxOTA4MDVfMjcy/MDAxNTY1MDExNDA0NDQ0.6HOnJFq9OjAMYWAZcLNX1a8okDNHPRLm0s0Y6djzHUEg.fOX-DQbLGo_rUjmP9kR2vNp_ZKd6S8UnaWdeqRqnPK4g.JPEG.she2325/jailam-rashad-1297005-unsplash.jpg?type=w966"];

class Image extends Component {
    onload = (e) => {
        console.dir(e.target);
        if(e.target.src.includes('base64')) {
            e.target.className = "MainImage";
        }
    }
    render(){
        const {id, like, isLike, view, size, match} = this.props
        
        return( 
        <div className ="Image-Page">
            <div className = "Image-Page-Column">
                <img className = "Image-Page-MainImage" ref = {(c) => {this.img = c}}
                /*onLoad={this.onload}*/
                src={`https://poloapp.s3.ap-northeast-2.amazonaws.com/image/${match.params.id}`} alt = {id}/>
                
                     <div className ="Watermark">
                        <div className = "Watermark-Logo" style = {{backgroundImage : `url(${require('../img/Logo_white.svg')})`}}/> 
                        <div className = "Watermark-Text">Polaroid</div>
                    </div>
                
            </div>    
        <ImageUseInformation like = {like} isLike = {isLike} view = {view} size = {size} />
        <p className = "Relatied-Title Image-Column"> Relatied Image</p>
        {/* <RelationImage id = {id}/> */}
        </div>
        )
    }
}

class ImageUseInformation extends Component {
    
    //Mark가 들어간건 즐겨찾기
    //Dec가 들어간건 신고창
    //Like가 들어간건 좋아요

    state = {
        isMarkPopUpOpen: false,
        isMarkClick: false,
        isDecPopUpOpen: false,
        isLikeClick: false,
        like: this.props.like
    }

    openMarkPopUp = () => {
        this.setState({
            isMarkPopUpOpen: true
        })
    }

    closeMarkPopUp = () => {
        this.setState({
            isMarkPopUpOpen: false,
            isMarkClick: false
        })
    }

    confirmMarkPopUp = () => {
        this.setState({
            isMarkPopUpOpen: false
        })
    }

    openDecPopUp = () => {
        this.setState({
            isDecPopUpOpen: true
        })
    }

    closeDecPopUp = () => {
        this.setState({
            isDecPopUpOpen: false
        })
    }
    
    clickMark = () =>{
        this.setState({
            isMarkClick: true
        })
    }

    reclickMark = () => {
        this.setState({
            isMarkClick: false,
            isMarkPopUpOpen: false
        })
    }

    clickLike = () =>{
        this.setState({
            isLikeClick: true,
            like: this.state.like + 1   //한 번 누르면 증가
        })
    }

    reclickLike = () => {
        this.setState({
            isLikeClick: false,
            like: this.state.like - 1   //한 번 누르면 감소
        })
    }

    onClickDeclaration = () => {
        this.state.isDecPopUpOpen ? this.closeDecPopUp() : this.openDecPopUp()
    }

    onClickMark = () => {
        this.state.isMarkPopUpOpen ? this.closeMarkPopUp() : this.openMarkPopUp()
        this.state.isMarkClick ? this.reclickMark() : this.clickMark()
    }

    onClickLike = () => {
        this.state.isLikeClick ? this.reclickLike() : this.clickLike()
    }

    render(){
        
        let markname = this.state.isMarkClick ? "star" : "star outline"

        let likename = this.state.isLikeClick ? "heart" : "heart outline"

        return(
            <div className = "Image-Page-Column">
            <p> {this.props.size} </p>
            <div className = "Image-UseInforfmation">
                <div className = "Image-UseInforfmation-Item">
                    <Icon className = "Declaration" name = "warning circle" onClick={this.onClickDeclaration}/>
                    <Declaration isOpen={this.state.isDecPopUpOpen} close={this.closeDecPopUp} />
                </div>
                <div className = "Image-UseInforfmation-Item">
                    {
                        ((localStorage.usertoken === undefined) && (sessionStorage.usertoken === undefined)) 
                        
                        ? 
                        
                        <Link to = "/user/login" alt="test"><Icon className = "Icon-Mark" name = {markname} onClick = {this.onClickMark}/></Link>
                        
                        : 
                        
                        <Icon className = "Icon-Mark" name = {markname} onClick = {this.onClickMark}/> 
                    }
                        <Mark isOpen={this.state.isMarkPopUpOpen} close={this.closeMarkPopUp} confirm={this.confirmMarkPopUp}/>
                </div>
                <div className = "Image-UseInforfmation-Item">
                    <Icon className = "Icon-Like" name = {likename} onClick={this.onClickLike}/>
                    {this.state.like}
                </div>
                <div className = "Image-UseInforfmation-Item">
                    <Icon className = "Icon-View " name = "eye"/>
                    {this.props.view}
                </div>
            </div>
            </div>
        )
    }
}


// class RelationImage extends Component{
//     state = {
//         image : [{
//             id : "0",
//             tags : ["풍경", "하늘", "푸른"]
//         },{
//             id : "1",
//             tags: ["풍경", "푸른", "태그"]
//         },{
//             id : "2",
//             tags : ["야자수", "푸", "밝은"]
//         },{
//             id : "3",
//             tags : ["풍경", "태", "밝은"]
//         },{
//             id : "4",
//             tags : ["풍경", "태그", "밝은"]
//         }]
//     }

//     searchImage(){
//         const relation = [];
//         this.state.image.some((image) => {
//             let n;
//             if(1 !== image.id){
//                 n = 0;
//                 this.state.image[this.props.id].tags.forEach((tag) => {
//                     if(image.tags.indexOf(tag) !== -1)
//                         n++;
//                 })
//             }
//             if(n >= 1){
//                 relation.push(image);
//             }// 일단은 이렇게!!!!!!! 백엔드에 따라 달라질 것, 동일 카테고리 내에서만 찾는 게 나을듯 
//             if (relation.length === 3) return true; //break
//             else return false; // 계속!
//         })
//         return relation;
//     }


//     render_Image(){
        
//        const relation = this.searchImage().map((image) => {
//             return (
//                 <div className = "Image-Relation" style = {{ backgroundImage : `url(${im[image.id]})`}}/>
//             )
//        })
//        return relation;
//     }

//     render(){
        
//         return( 
//             <div className = "Image-Column">
//                 {this.render_Image()}
//             </div>
//         );
//     }
// }


export default withRouter(Image);