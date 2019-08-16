import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Image.css';
import {Icon} from 'semantic-ui-react';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


const im = ["https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492__340.jpg",
"https://img.freepik.com/free-vector/trendy-seamless-floral-pattern-vector-illustration_1305-2422.jpg?size=626&ext=jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvNPtYLsC4TWqXnYrWT2nWAaJQjXWfcu0Qog4WUsBX3L6I8Vs5",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffdlwQgYF5gUQwbmt6aAcYmtuD7eeDcVAsB5XzsYP29zhpmmk",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR76QA5a6PCTYXXxEtyYQY3QfE02g7g1Kd91zqbpqQcluMu3viA"];

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

function Image({id, tags, type, uploadDate, downloade, kategorie, like, isLike, veiw, size, mark}) {
    return ( 
        <div className = "Image">
            <div className = "Image-Column">
                <img className = "MainImage" src = {im[id]} alt = {id}></img>
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
                <div className = "Image-UseInforfmation-Item">
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
                <div className = "Image-Relation">
                    <img src = {im[image.id]} alt = {image.id} key = {image.id} />
                </div>
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


export default Image;