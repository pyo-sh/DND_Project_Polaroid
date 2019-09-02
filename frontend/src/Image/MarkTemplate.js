import React from 'react';

const MarkTemplate = ({NewFolder, FolderList}) => {
    return(
        <React.Fragment>
        {
            this.props.isOpen ?
            <React.Fragment>
                <div className="Mark-Modal-Overlay" onClick={this.props.close} />
                <div className="Mark-Modal">
                    {NewFolder}
                    <div className="Mark-Content">
                        <div onClick={this.onClickFolder}>
                            {Folder} 기본 폴더   
                            
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

export default MarkTemplate;