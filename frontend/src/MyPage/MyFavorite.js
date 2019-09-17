import React, { Component } from 'react';
import { getAllFavorite } from './MyPageFunction';
import './MyFavorite.css';
import { Link } from 'react-router-dom';

class MyFavorite extends Component {
    state = {
        favoriteFolder: [],
        // 현재 출력하고 있는 폴더
        nowPage: 0,
        // 현재 사람의 폴더 리스트
        folderNum: [],
        // 현재 출력하고 있는 폴더의 넘버
        nowFolderNum: 0,
        favoriteLength: 0
    }
    // 지금 자신의 아이디를 가져온 뒤, favorite 폴더를 불러온다.
    componentWillMount() {
        const ID = this.props.getID();
        getAllFavorite(ID).then(res=>{
            if(!res.length !== 0){
                this.setState({
                    favoriteFolder : res,
                    nowPage: 1,
                    nowFolderNum: res[0].favFolderNum,
                    favoriteLength: res.length
                })
                this.setFolderList(res);
            }
            else
                this.setState({
                    favoriteFolder : res,
                    favoriteLength: res.length
                })
        })
    }

    // 현재 사람의 폴더 리스트를 state시키는 함수
    setFolderList = (favoriteFolder) => {
        let folderNum = [];
        if(favoriteFolder !== null){
            folderNum = favoriteFolder.map((folder) => {
                return folder.favFolderNum;
            })
        }
        else
            folderNum.concat(0);
        this.setState({
            folderNum: folderNum
        })
    }

    // 폴더를 클릭 했을 때 발생하는 이벤트.
    favOnClick = (e) => {
        if(e.target.className==="MyFavorite-Selected-Button"){}
        else{
            let children = [...e.target.parentNode.children];
            children.map((child) => {
                child.className = "MyFavorite-Unselected-Button";
                return null;
            })
            e.target.className="MyFavorite-Selected-Button";
            this.setState({
                nowPage: parseInt(e.target.innerText)
            });
        }
    }

    _renderButton = (favoriteFolder) => {
        let buttonDiv = '';
        if(favoriteFolder !== null){
            buttonDiv = favoriteFolder.map((folder, index) => {
                if(index === 0)
                    return <button
                        className="MyFavorite-Selected-Button"
                        key={index+1}
                        onClick={this.favOnClick}
                        >{index+1}. {folder.favFolderName}</button>
                return <button 
                    className="MyFavorite-Unselected-Button"
                    key={index+1}
                    onClick={this.favOnClick}
                    >{index+1}. {folder.favFolderName}</button>;
            })
        }
        return buttonDiv;
    }

    _renderFolder = (favoriteFolder, nowPage) => {
        const { folderNum } = this.state;
        let folderFile = '';
        if(favoriteFolder !== null) {
            folderFile = favoriteFolder.map((folder, index) => {
                if(folderNum[nowPage-1] === folder.favFolderNum){
                    if(folder.imgID !== null){
                        return <Link to = {`/imagepage/${folder.imgID}`} key={index+1}>
                                <div className="MyFavorite-File">{index + 1}. {folder.imgName}</div>
                            </Link>
                    }
                }
                else
                    return null;
            })
        }
        return (
            <div className="MyFavorite-Files">
                {folderFile}
            </div>
        );
    }

    render() {
        const { favoriteFolder, nowPage } = this.state;
        return (
            <div className="MyFavorite-Window">
                <div className="MyFavorite-Buttons">
                    {this._renderButton(favoriteFolder)}
                </div>
                <div className="MyFavorite-Foldercontrol">

                </div>
                {this._renderFolder(favoriteFolder, nowPage)}
            </div>
        );
    }
}

export default MyFavorite;
