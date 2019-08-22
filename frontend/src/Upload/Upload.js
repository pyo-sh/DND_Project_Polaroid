import React from "react";
import "./Upload.css";
import {post} from 'axios';

class Upload extends React.Component {
  render(){
    return (
      <div className="App">
        <div className="Frame">
          <div className="Letter">UPLOAD</div>
          <div className="Frame-in">
            <ImportImage/>
            <div className="CatTag">
              <div className="Category">카테고리
                <Select/>
              </div>
              <div className="Tag">태그
                <input className="TagInput" type="text" name="태그" placeholder="쉼표로 구분"></input>
              </div>
            </div>
            <div className="TagExpl">3개 이상</div>
            <div className="Price">가격
              <StartPrice/>
            </div>
            <Distribute/>
             <div className="Copyright">
              <input className="CommercialAvailable" type='checkbox' name='Copyright' value='CommercialAvailable'/>상업적 이용 불가
              <input className="CopyrightNotice" type='checkbox' name='Copyright' value='CopyrightNotice'/>저작권 표시
              <input className="Change" type='checkbox' name='Copyright' value='Change'/>변경금지
             </div>
            <div className="Visibility">
              <input className="public" type='radio' name='visibility' value='public'/>공개
              <input className="private" type='radio' name='visibility' value='private'/>비공개
            </div>
            <LoggingButton/>
          </div>
        </div>
      </div>
    );
  }
}

class ImportImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null, // 실제 byte 형태의 데이터
      fileName: "" // 보내고자 하는 파일 이름
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.uploadImage().then(res => {
      console.log(res.data);
    });
  };

  handleFileChange = e => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    });
  };

  uploadImage = () => {
    const url = "/api/image";
    const formData = new FormData();
    formData.append("image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <button className="imageBtn">
        <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
        </button><br/>
        <button type="submit">Upload</button>
      </form>
    );
  }
}

const options=[
  {
    name: '--선택--',
    value: null,
  },
  {
    name: 'Wallpaper',
    value: 'Wallpaper',
  },
  {
    name: 'Nature',
    value: 'Nature',
  },
  {
    name: 'Fashion',
    value: 'Fashion',
  },
  {
    name: 'Illustration',
    value: 'Illustration',
  },
  {
    name: 'Art Works',
    value: 'Art Works',
  },
  {
    name: 'People',
    value: 'People',
  },
  {
    name: 'Patterns',
    value: 'Patterns',
  },
  {
    name: 'Architecture',
    value: 'Architecture',
  },
  {
    name: 'Business',
    value: 'Business',
  },
  {
    name: 'Animals',
    value: 'Animals',
  },
  {
    name: 'Travel',
    value: 'Travel',
  },
  {
    name: 'Food',
    value: 'Food',
  }
]
class Select extends React.Component{
  state={value:''};

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({value: e.target.value});
  };

  render(){
    const{value} =this.state;

    return(
        <select className='categoryDropBox' value={value} onChange={this.handleChange}>
          {options.map(item => (
            <option key={item.value} value={item.value} >
              {item.name}
            </option>
          ))}
        </select>
    );
  }
}

class StartPrice extends React.Component{
  onSubmit(e){
    e.preventDefault();
    var firstSetPrice=this.firstSetPrice;
    console.log(firstSetPrice);
  }
  render(){
    return(
      <input className="PriceInput" type="text" name="firstSetPrice" ref={(c)=>this.firstSetPrice=c}></input>
    );
  }
}

class Distribute extends React.Component{
  buttonChecked = (e) =>{
    if(e.target.value==='free'){console.log('free');}
    else{ console.log('charge');}
  }
  render(){
    return(
      <div className="Distribute">
        <input className="free" type='radio' name='Distribute' value='free' onClick={this.buttonChecked} />무료배포
        <input className="charge" type='radio' name='Distribute' value='charge' onClick={this.buttonChecked}/>유료배포
      </div>
    );
  }
}

class LoggingButton extends React.Component {
  handleClick = () => {
      alert('업로드 완료');
  }

  render() {
    return (
      <button className="UploadBtn" onClick={this.handleClick}>업로드</button>
    );
  }
}

export default Upload;