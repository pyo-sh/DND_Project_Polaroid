import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import ChangeNewFolder from './ChangeNewFolder';
import FolderList from './FolderList';
import './Mark.css';

class Mark extends Component { 
    
    id = 0

    state = {
        input: '',
        clickFolder: false,
        clickFolderName: false,
        folder: []
    }

    //폴더 추가 눌렀을때 상태
    openNewFolder = () =>{
        this.setState({clickFolderName: true})
    }

    //폴더 추가 취소 상태
    closeNewFolder = () =>{
        this.setState({clickFolderName: false})
    }

    //폴더 추가 취소 
    originNewFolder = () =>{
        return(
            <div onClick={this.openNewFolder}><Icon name = "plus" />폴더 추가</div>     
        )
    }
    
    //폴더 추가 눌렀을때
    _changeNewFolder = () => {
        return(
            <ChangeNewFolder value={this.state.input} onChange={this.onChange} onClickConfirm={this.onClickConfirm} closeNewFolder={this.closeNewFolder}/>
        )
    } 
    
    //input박스에 폴더 이름 입력시
    onChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    //폴더 추가 확인 버튼을 눌렀을 때
    onClickConfirm = () => {
        
        this.closeNewFolder()
        
        this.setState({
            input: '',
            folder: this.state.folder.concat({
                id: this.id++,
                text: this.state.input,
                checked: false
            })
        })
        
    }

    //만들어진 폴더를 클릭할 때
    onClickFolder = (e) => {

        this.setState({
            clickFolder: !this.state.clickFolder
        })
    }

    handleToggle = (id) => {
        
        // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
        const index = this.state.folder.findIndex(todo => todo.id === id);
        const selected = this.state.folder[index]; // 선택한 객체
    
        const nextFolder = [...this.state.folder]; // 배열을 복사
    
        // 기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextFolder[index] = { 
          ...selected, 
          checked: !selected.checked
        };
    
        this.setState({
          folder: nextFolder
        });
      }

    render(){
 
        let folderIcon = this.state.clickFolder ? <Icon name="folder open" /> : <Icon name="folder" />
        
        //폴더 추가 눌렀을 경우...
        let newFolder = this.state.clickFolderName ? this._changeNewFolder() : this.originNewFolder()

        return(
            <React.Fragment>
            {
                this.props.isOpen ?
                <React.Fragment>
                    <div className="Mark-Modal-Overlay" onClick={this.props.close} />
                    <div className="Mark-Modal">
                        <h3 className="Mark-Title">{newFolder}</h3>
                        <div className="Mark-Content">
                            <div>
                                <FolderList folder={this.state.folder} folderIcon={folderIcon} onToggle={this.handleToggle}/>   
                            </div>     
                        </div>
                        <div className="Mark-Button-Wrap">
                            <button className="Mark-Button1" onClick={this.props.close}>CANCEL</button>
                            <button className="Mark-Button2" onClick={this.props.close}>CONFIRM</button>
                        </div>
                    </div>
                </React.Fragment>

                :
                null
            }
        </React.Fragment>
        )
    }
}

export default Mark;