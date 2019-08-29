import React, { Component } from 'react';
import axios from 'axios';

class UploadS3 extends Component {
    state = {
        selectedFile : '',
        success : false,
        url : '',
    }
    fileSelectedHandler = (e) => {
      this.setState({
        selectedFile : e.target.files[0]
    })}

    fileUploadHandler = (e) => {
        e.preventDefault();
        // const fd = new FormData();
        // console.log(this.state.selectedFile);
        let file = this.state.selectedFile;
        let fileParts = file.name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        // fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
        // const file = this.state.selectedFile;
        axios.post('/api/uploads3', {
            fileName,
            fileType
        })
        .then(res => {
            console.log(res);
             let returnData = res.data.data.returnData;
             let signedRequest = returnData.signedRequest;
             let url = returnData.url;
             this.setState({url});
             console.log("Recevied a signed request" + signedRequest);

             let options = {
                headers: {
                    'Content-Type' : fileType
                }
            };
            axios.put(signedRequest, file, options)
            .then(results => {
                console.log("Response from s3")
                this.setState({sucess : true});
            })
            .catch(err => {
                alert("ERROR " + JSON.stringify(err));
            })
        })
    }

    render() {
        return (
            <div>
            <form >
                <input type="file" name="imgFile" onChange={this.fileSelectedHandler}></input>
                <button type="submit" onClick={this.fileUploadHandler}>s3에 보내기</button>                
            </form>
            <img src={this.state.url}></img>
            </div>
        );
    }
}

export default UploadS3;
