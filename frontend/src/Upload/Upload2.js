import React from "react";
import "./Upload.css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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

class Upload2 extends React.Component {
  state = {
    img: null, // 실제 byte 형태의 데이터
    imgName: "", // 보내고자 하는 파일 이름,
    imgType : '',
    imgUrl : '',
    imgResult : '', // 프리뷰를 위한.
        category: '',
        tag:'',
        price:'',
        distribute:'',
        commercialAvailable:'',
        copyrightNotice:'',
        noChange:'',
        visibility:''
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    await this.uploadImage();
    alert('업로드 완료 되었습니다.');
    // this.props.history.push(`/mypage`);
  };

  handleFileChange = e => { // 미리 보기
    e.preventDefault();
    let reader = new FileReader();
    let img = e.target.files[0];
    console.log(img);
    let imgParts = img.name.split('.');
    let imgName = imgParts[0];
    let imgType = imgParts[1];
    reader.onload=()=>{
      this.setState({
        img,
        imgName,
        imgType,
        imgReulst: reader.result
      });
    }
    reader.readAsDataURL(img)
  };

  handleValueChange = (e) => { // 값 바꾸기
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  uploadImage = () => {
      const { img,imgName, imgType, category, tag, distribute, price, commercialAvailable, copyrightNotice
    , noChange, visibility} = this.state;
      const imageData = {
        img,
        imgName,
        imgType,
          category,
          tag,
          distribute,
          price,
          commercialAvailable,
          copyrightNotice,
          noChange,
          visibility
      }
      axios.post('/api/upload2', {imageData})
      .then(res => {
          let returnData = res.data.data.returnData;
          let signedRequest = returnData.signedRequest;
          let imgUrl = returnData.url;
          this.setState({imgUrl});

          let options = {
              headers : {
                  'Content-Type' : imgType
              }
          };
          axios.put(signedRequest, img, options)
          .then(results => {
              this.setState({success : true})
          })
          .catch(err => {
              alert("ERROR" + JSON.stringify(err));
          })
      })
  }

   

  render(){
    let {imgReulst} = this.state;
    let $imgNameUrl = null;
    if(imgReulst) {$imgNameUrl = (<img src={imgReulst}/>)}


    else{$imgNameUrl = (<div className = "previewText">Image Preview</div>)}

    return (
      <div className="Upload">
        <div className="Frame">
          <div className="Letter">UPLOAD</div>
          <div className="Frame-in">
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <div className = "previewComponent">
                <div className="imgPreview">{$imgNameUrl}</div>
              </div>
                <input className="imageBtn" type="file" name="img" file={this.state.img} /* value={this.state.fileName} */ onChange={this.handleFileChange}/>
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
              <button className="uploadBtn" type="submit" onClick={this.handleFormSubmit}>UPLOAD</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Upload2);