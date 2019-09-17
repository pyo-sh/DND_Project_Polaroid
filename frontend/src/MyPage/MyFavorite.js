import React, { Component } from 'react';
import { getAllFavorite } from './MyPageFunction';
import './MyFavorite.css';
import { Link } from 'react-router-dom';

class MyFavorite extends Component {
    state = {
        favoriteFolder: [],
        nowPage: 0,
        nowPageName: "",
        favoriteLength: 0
    }
    componentDidMount() {
        const ID = this.props.getID();
        getAllFavorite(ID).then(res=>{
            if(!res.length !== 0)
                this.setState({
                    favoriteFolder : res,
                    nowPage: 1,
                    nowPageName: res[0].favFolderName,
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
        let Name = "";
        const nameList = e.target.innerText.split(" ");
        for(let i = 1; i < nameList.length; ++i){
            if(i !== 1)
                Name = Name + " ";
            Name = Name + nameList[i];
        }
        if(e.target.className==="MyFavorite-Selected-Button"){}
        else{
            let children = [...e.target.parentNode.children];
            children.map((child) => {
                child.className = "MyFavorite-Unselected-Button";
                return null;
            })
            e.target.className="MyFavorite-Selected-Button";
            this.setState({
                nowPage: parseInt(e.target.innerText),
                nowPageName: Name
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
        let folderFile = '';
        if(favoriteFolder !== null) {
            folderFile = favoriteFolder.map((folder, index) => {
                if((index+1) === nowPage){
                    let favName = ''
                    if(folder.favorites){
                        favName = folder.favorites.map((file, index) => {
                            return <Link to = {`/imagepage/${file.favName}`}>
                                    <div className="MyFavorite-File" key={index+1}>{index + 1}. {file.favName}</div>
                                </Link>
                        });
                    }
                    return (
                        <div className="MyFavorite-Files">{favName}</div>
                    );
                }
                else
                    return null;
            })
        }
        return (
            <>
                {folderFile}
            </>
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
