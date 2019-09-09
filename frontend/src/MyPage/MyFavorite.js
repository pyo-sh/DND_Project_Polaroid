import React, { Component } from 'react';
import { getAllFavorite } from './MyPageFunction';
import './MyFavorite.css';

class MyFavorite extends Component {
    state = {
        favoriteFolder: [],
        nowPage: 0,
        favoriteLength: 0
    }
    componentDidMount() {
        const ID = this.props.getID();
        getAllFavorite(ID).then(res=>{
            if(!res.length !== 0)
                this.setState({
                    favoriteFolder : res,
                    nowPage: 1,
                    favoriteLength: res.length
                })
            else
                this.setState({
                    favoriteFolder : res,
                    favoriteLength: res.length
                })
        })
    }

    favOnClick = (e) => {
        if(e.target.className==="MyFavorite-Selected-Button"){}
        else{
            let children = [...e.target.parentNode.children];
            children.map((child) => {
                child.className = null;
                return null;
            })
            e.target.className="MyFavorite-Selected-Button";
            this.setState({
                nowPage: parseInt(e.target.innerText)
            });
        }
    }

    _renderButton = () => {
        const { favoriteLength } = this.state;
        let buttonList = [];
        for(let i=1; i <= favoriteLength; ++i)
            buttonList = buttonList.concat(i);
        let buttonDiv = '';
        buttonDiv = buttonList.map((list, index) => {
            if(index === 0)
                return <button 
                    className="MyFavorite-Selected-Button"
                    key={index+1}
                    onClick={this.favOnClick}
                    >{list}</button>
            return <button key={index+1} onClick={this.favOnClick}>{list}</button>;
        })
        return buttonDiv;
    }

    _renderFolder =(favoriteFolder, nowPage) => {
        let folderFile = '';
        if(favoriteFolder !== null) {
            folderFile = favoriteFolder.map((folder, index) => {
                if((index+1) === nowPage){
                    let favName = ''
                    if(folder.favorites){
                        favName = folder.favorites.map((file, index) => {
                            return <div className="MyFavorite-File" key={index+1}>{index + 1}. {file.favName}</div>
                        });
                    }
                    return (
                        <div className="MyFavorite-Files" key = {index +1}>
                            <div className="MyFavorite-Title">{index + 1}. {folder.favFolderName}</div>
                            <div>{favName}</div>
                        </div>
                    );
                }
                else
                    return null;
            })
        }
        return (
            <div>
                {folderFile}
            </div>
        );
    }

    render() {
        const { favoriteFolder, nowPage } = this.state;
        return (
            <div className="MyFavorite-Window">
                <div className="MyFavorite-Buttons">
                    {this._renderButton()}
                </div>
                {this._renderFolder(favoriteFolder, nowPage)}
            </div>
        );
    }
}

export default MyFavorite;
