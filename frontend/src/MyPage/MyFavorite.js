import React, { Component } from 'react';
import { getAllFavorite } from './MyPageFunction';

class MyFavorite extends Component {
    state = {
        favoriteFolder : []
    }
    componentDidMount() {
        const ID = this.props.getID();
        getAllFavorite(ID).then(res=>{
            this.setState({
                favoriteFolder : res
            })
        console.log(this.state.favoriteFolder);
        console.log(this.state.favoriteFolder[0].favorites[0].favName);
        })
    }
    render() {
        const { favoriteFolder } = this.state;
        let folderFile = '' ;
        if(favoriteFolder !== null) {
            folderFile = favoriteFolder.map((folder, index) => {
                let favName = ''
                // if(folder.favorites[0]) {
                //     favName = folder.favorites[0].favName;
                // }
                if(folder.favorites){
                    favName = folder.favorites.map((file, index) => {
                        return <li key={index+1}>{index + 1 }째 파일 {file.favName}</li>
                    })
                }
                return (<div key = {index +1}>
                <div>{index + 1}째 폴더이름 : {folder.favFolderName}</div>
                <div> 파일 이름 : {favName}</div>
                </div>
                )
            })
        }
     
        return (
            <div>
                {folderFile}
            </div>
        );
    }
}

export default MyFavorite;
