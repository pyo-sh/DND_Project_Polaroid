import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Image.css';
import {Icon} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const im = ["https://postfiles.pstatic.net/MjAxOTA3MzBfNyAg/MDAxNTY0NDkxMzU1MjYw.6PsoCMM-IhbyMp28iN-PGLiPRgFhUk85GP-iLWcQLsIg.qG9gNv0c480J1n8PkTKyD8SqKvkheTeFjVtuphz3CaEg.JPEG.she2325/7.jpg?type=w966",
"https://postfiles.pstatic.net/MjAxOTA3MzBfODgg/MDAxNTY0NDkxMzU0OTY3.1VS0WEhoUmxz31Yv_Fqn8hTz0b_PI67lgDJsn3u3igcg.IeT-JpGIgHGKxUR-exblUdRKTSHZCJhaHNFQMcqxzEMg.JPEG.she2325/8.jpg?type=w966",
"https://postfiles.pstatic.net/MjAxOTA3MzBfMTEg/MDAxNTY0NDkxMzU0ODY3.6eVSLBjwuAl2I_PZJl-rETOeIlCPLoH6Zd3BsRXu1LMg.WbPXfoyS3ACPaWJ73skzmsjnD1eHClaVgbpxAEw2cJ4g.JPEG.she2325/9.jpg?type=w966",
"https://postfiles.pstatic.net/MjAxOTA3MzBfMjA2/MDAxNTY0NDkxMzU1NDQ2.vY704r4pmlsPx_ijWiAWMCbNUBw101-pRDzUxh7vxX8g.K9VsOmd0BkLHn73-GrF2nLzh4n1KzZiH2eoPfKHiWOAg.JPEG.she2325/11.jpg?type=w966",
"https://postfiles.pstatic.net/MjAxOTA4MDVfMjcy/MDAxNTY1MDExNDA0NDQ0.6HOnJFq9OjAMYWAZcLNX1a8okDNHPRLm0s0Y6djzHUEg.fOX-DQbLGo_rUjmP9kR2vNp_ZKd6S8UnaWdeqRqnPK4g.JPEG.she2325/jailam-rashad-1297005-unsplash.jpg?type=w966"];

Image.protoType = {
    id : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    uploadDate : PropTypes.string.isRequired,
    downloade : PropTypes.string.isRequired,
    kategorie : PropTypes.string.isRequired,
    like : PropTypes.string.isRequired,
    isLike : PropTypes.bool,
    veiw : PropTypes.string.isRequired,
    size : PropTypes.string.isRequired,
    mark : PropTypes.bool   
}

ImageUseInformation.protoType = {
    like : PropTypes.string.isRequired,
    isLike : PropTypes.bool,
    veiw : PropTypes.string.isRequired,
    size : PropTypes.string.isRequired,
    mark : PropTypes.bool
}

function Image({id, like, isLike, veiw, size, mark, match}) {
    return ( 
        <div className = "Image">
            <div className = "Image-Column">
                <img className = "MainImage" src={require(`../img/photo/${match.params.image}`)} alt = {id}></img>
            </div>    
            <ImageUseInformation like = {like} isLike = {isLike} veiw = {veiw} size = {size} mark = {mark}/>
            <p className = "Relatied-Title Image-Column"> Relatied Image</p>
            <RelationImage id = {id}/>
        
        </div>
     );
    
}

function ImageUseInformation({like, isLike, veiw, size, mark}){
    return(
        <div className = "Image-Column">
            <p> {size} </p>
            <div className = "Image-UseInforfmation">
                <div className = "Image-UseInforfmation-Item">
                    <Icon className = "Declaration" name = "warning circle"/>
                </div>
                <div className = "Image-UseInforfmation-Item">
                    <Icon className = "Mark" name = {mark ? "star" : "star outline"}/> 
                </div>
                <div className = "Image-UseInforfmation-Item">
                    <Icon className = "Like" name = {mark ? "heart" : "heart outline"} color = "red"/>
                    {like}
                </div>
                <div className = "Image-UseInforfmation-Item" >
                    <Icon className = "Veiw " name = "eye"/>
                    {veiw}
                </div>
            </div>
        </div>
    );
}

class RelationImage extends Component{
    state = {
        image : [{
            id : "0",
            tags : ["풍경", "하늘", "푸른"]
        },{
            id : "1",
            tags: ["풍경", "푸른", "태그"]
        },{
            id : "2",
            tags : ["야자수", "푸", "밝은"]
        },{
            id : "3",
            tags : ["풍경", "태", "밝은"]
        },{
            id : "4",
            tags : ["풍경", "태그", "밝은"]
        }]
    }

    SearchImage(){
        const relation = [];
        this.state.image.some((image) => {
            let n;
            if(this.props.id !== image.id){
                n = 0;
                this.state.image[this.props.id].tags.forEach((tag) => {
                    if(image.tags.indexOf(tag) !== -1)
                        n++;
                })
            }
            if(n >= 1){
                relation.push(image);
            }// 일단은 이렇게!!!!!!! 백엔드에 따라 달라질 것, 동일 카테고리 내에서만 찾는 게 나을듯 
            if (relation.length === 3) return true; //break
            else return false; // 계속!
        })
        return relation;
    }


    render_Image(){
       const relation = this.SearchImage().map((image) => {
            return (
                <div className = "Image-Relation" style = {{ backgroundImage : `url(${im[image.id]})`}}/>
           );
       })
       return relation;
    }

    render(){
        return( 
            <div className = "Image-Column">
                {this.render_Image()}
            </div>
        );
    }
}


export default withRouter(Image);