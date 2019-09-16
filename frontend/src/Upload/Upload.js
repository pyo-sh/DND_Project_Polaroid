import React from "react";
import "./Upload.css";
import {post} from 'axios';

const options=[
  {name: '--선택--', value: null,},
  {name: 'Wallpaper', value: 'Wallpaper',},
  {name: 'Nature',value: 'Nature',},
  {name: 'Fashion',value: 'Fashion',},
  {name: 'Illustration',value: 'Illustration',},
  {name: 'Art Works',value: 'Art Works',},
  {name: 'People',value: 'People',},
  {name: 'Patterns',value: 'Patterns',},
  {name: 'Architecture',value: 'Architecture',},
  {name: 'Business',value: 'Business',},
  {name: 'Animals',value: 'Animals',},
  {name: 'Travel',value: 'Travel',},
  {name: 'Food',value: 'Food',}
]

class Upload extends React.Component {
  state = {
        file: null, // 실제 byte 형태의 데이터
        fileName: "", // 보내고자 하는 파일 이름
        category: '',
        tag:'',
        price:'',
        distribute:'',
        commercialAvailable:'',
        copyrightNotice:'',
        noChange:'',
        visibility:''
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.uploadImage().then(res => {
      console.log(res.data);
    })
    this.setState({
      file:null,
      fileName:'',
      category: '',
      tag:'',
      price:'',
      distribute:'',
      CommercialAvailable:'',
      CopyrightNotice:'',
      noChange:'',
      visibility:''
    })
    //window.location.reload();
  };

  handleFileChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    console.log(file.name);
    reader.onload=()=>{
      console.log(reader.result);
      this.setState({
        file: file,
        fileName: reader.result
      });
    }
    reader.readAsDataURL(file)
  };

  handleValueChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  uploadImage = () => {
    const url = "/api/uploadImg";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("category", this.state.category);
    formData.append("tag", this.state.tag);
    formData.append("distribute", this.state.distribute);
    formData.append("price", this.state.price);
    formData.append("CommercialAvailable", this.state.commercialAvailable);
    formData.append("CopyrightNotice", this.state.copyrightNotice);
    formData.append("noChange", this.state.noChange);
    formData.append("visibility", this.state.visibility);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  };

  render(){
    let {fileName} = this.state;
    let $fileNameUrl = null;
    if(fileName) {$fileNameUrl = (<img src={fileName}/>)}


    else{$fileNameUrl = (<div className = "previewText">Image Preview</div>)}

    return (
      <div className="Upload">
        <div className="Frame">
          <div className="Letter">UPLOAD</div>
          <div className="Frame-in">
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <div className = "previewComponent">
                <div className="imgPreview">{$fileNameUrl}</div>
              </div>
                <input className="imageBtn" type="file" name="file" file={this.state.file} /* value={this.state.fileName} */ onChange={this.handleFileChange}/>
            </div>
              <div className="CatTag">
                <div className="CatTagCategory">카테고리
                  <select className='categoryDropBox' name="category" value={this.state.category} onChange={this.handleValueChange}>
                    {options.map(item => (
                      <option key={item.value} value={item.value} >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="Tag">태그
                  <input className="TagInput" type="text" name="tag" value={this.state.tag} onChange={this.handleValueChange} placeholder="쉼표로 구분"></input>
                </div>
              </div>
              <div className="TagExpl">5개 이하</div>
              <div className="Distribute">
                <input className="free" type='radio' name='distribute' value="free" onChange={this.handleValueChange} />무료배포
                <input className="charge" type='radio' name='distribute' value="charge" onChange={this.handleValueChange}/>유료배포
              </div>
              <div className={"Price" + (this.state.distribute === 'charge' ? " Visible" : "")}>가격
                <input className="PriceInput" type="text" name="price" value={this.state.price} onChange={this.handleValueChange}></input>
              </div>
              <div className="Copyright">
                <input className="CommercialAvailable" type='checkbox' name='commercialAvailable' value='NotCommercialAvailable' onChange={this.handleValueChange}/>상업적 이용 불가
                <input className="CopyrightNotice" type='checkbox' name='copyrightNotice' value='CopyrightNotice' onChange={this.handleValueChange}/>저작권 표시
                <input className="Change" type='checkbox' name='noChange' value='NoChange' onChange={this.handleValueChange}/>변경금지
              </div>
              <div className="Visibility">
                <input className="public" type='radio' name='visibility' value='public' onChange={this.handleValueChange}/>공개
                <input className="private" type='radio' name='visibility' value='private' onChange={this.handleValueChange}/>비공개
              </div>
              <button className="uploadBtn" type="submit" onClick={(e)=>this.handleFormSubmit(e)}>UPLOAD</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;