import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import './NewFolder.css';

class NewFolder extends Component {
    state={
        folder: "",
        clickFolderName: false
    }

    openNewFolder = () =>{
        this.setState({clickFolderName: true})
    }

    closeNewFolder = () =>{
        this.setState({clickFolderName: false})
    }

    originNewFolder = () =>{
        return(
            <>
            <div onClick={this.openNewFolder}><Icon name = "plus" />폴더 추가</div>
            </>
        )
    }
    
    changeNewFolder = () => {
        return(
            <div>
                <form className="Add-Folder">
                    <input 
                        type="text" 
                        placeholder="폴더 이름 입력" 
                        className="New-Folder" 
                        name="folder"
                        value={this.state.folder}
                        onChange={this.onChange}
                    />
                    <div className="Confirm-Area">
                        <button className="Confirm" onClick={this.onClickConfirm}>확인</button>
                        <button className="Cancel" onClick={this.closeNewFolder}>취소</button>
                    </div>     
                </form>
            </div>
        )
    } 

    onClickConfirm = (e) => {
        this.closeNewFolder()
        
        this.setState({
            folder: ""
        })
        console.log(this.state.folder)
        //e.preventDefault()
        //<button~ 이부분 form으로 둘러싸라...
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){

        let newFolder = this.state.clickFolderName ? this.changeNewFolder() : this.originNewFolder()

        return(
            <h3 className="Mark-Title">{newFolder}</h3>
        )
    } 
}


export default NewFolder;