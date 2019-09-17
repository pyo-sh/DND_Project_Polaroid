import React, { Component } from "react";
import "./ImageInfo.css";
import Payment from "./Payment";
import { getFilm, minusFilm } from "./ImageFunction";
import jwt_decode from "jwt-decode";
import { withRouter } from 'react-router-dom';
import AWS from 'aws-sdk';
import {awsconfig} from '../Upload/awsconfig';
import {getImageInfo, getDownCount, plusDownUser } from './ImageFunction';


class ImageInfo extends Component {
  state = {
    img : {},
    imgID : '',
    imgName : '',
    imgType : '',
    imgUrl : '',
    category : '',
    tag : [],
    distribute : '',
    price : '',
    downCount : 0,
    commercialAvailable: '',
    copyrightNotice : '',
    noChange : '',
    visibility : '',
    imgHeight : '',
    imgWidth : '',
    userID : '',
    uploadDate : '',
    film : 0
  };

  componentDidMount() {
    const imgID = this.props.match.params.id
    getImageInfo(imgID).then(result => {
      const { imgID, imgName, imgType, imgUrl, category, tag, distribute, price, 
        commercialAvailable, copyrightNotice, noChange, 
        imgWidth,imgHeight,
        visibility, uploadDate, userID}
      = result;
      getDownCount(imgID).then(result => {
        let { downCount } = result[0];
        let uploadDate2 = uploadDate.split('T')[0];
        let tag2 = tag.split(' ');
        this.setState({
          imgID,
          imgName,
          imgType,
          imgUrl,
          category,
          tag : tag2,
          distribute,
          price,
          commercialAvailable,
          copyrightNotice,
          noChange,
          imgWidth,
          imgHeight,
          downCount,
          visibility,
          uploadDate : uploadDate2,
          userID
       })
    })
  })
}
  getID = () => { // ID 불러오기
    let token = "";
    localStorage.usertoken
      ? (token = localStorage.getItem("usertoken"))
      : (token = sessionStorage.getItem("usertoken"));
    const decode = jwt_decode(token);
    const ID = decode.ID;
    return ID;
  }
  _getFilm = () => { // 필름 가져오기
    const ID = this.getID();
    getFilm(ID).then(film => {
      this.setState({
        film
      });
    });
  };
  _minusFilm = price => { // 필름 마이너스
    const ID = this.getID();
    const filmNum = price;
    const info = {
      ID,
      filmNum
    };
    minusFilm(info);
  };

  downloadClick = () => {  // S3로부터 다운로드 받게함. 그리고 imgDownloads 테이블에 추가해서 카운트가 하나 늘어나게함.
    let {imgID, imgName, imgUrl} = this.state;
    let urlArray = imgUrl.split("/")
    let bucket = urlArray[2]
    let realBucket = bucket.split('.');
    realBucket = realBucket[0];
    // let Key = urlArray[4];
    let Key = `${urlArray[3]}/${urlArray[4]}`;
    let s3 = new AWS.S3({accessKeyId:awsconfig.accessKeyId, secretAccessKey : awsconfig.secretAccessKey});
    let params = {Bucket: realBucket, Key: Key}
    s3.getObject(params, (err, data) => {
      let blob=new Blob([data.Body], {type: data.ContentType});
      let link=document.createElement('a');
      const url=window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download',`${imgName}.${data.ContentType}`);
      document.body.appendChild(link);
      link.click();
      const userID = this.getID();
      plusDownUser(imgID, userID);
    })}

  onClick = () => {
    if(localStorage.usertoken || sessionStorage.usertoken){
      this._getFilm(); // 토큰이 더 적으면 충전 하게 만들어야함(충전 하는 곳으로 가시겠습니까 정도?) 토큰이 같거나 더 많을 때 다운로드 받을 수 있게
      this.downloadClick();
      this.props.handlePayment();
    }
    else {
      alert('로그인을 해주세요');
    }
  };
  render() {
    const {
      imgID,
      imgName,
      imgType,
      imgUrl,
      category,
      tag,
      distribute,
      price,
      commercialAvailable,
      copyrightNotice,
      noChange,
      visibility,
      userID,
      downCount,
      imgWidth,
      imgHeight,
      uploadDate,
      payment, // 페이먼트, 필름
      film
    } = this.state;
    return (
      <div className="ImageInfo">
        <Registrant userID={userID} />
        <div className="ImageInfo-Column Download">
          <button className={distribute === "free" ?  "Free": "Premium" } onClick={this.onClick}>
            {" "}
            {distribute === "free" ?  "Free Download": "Premium Download"}{" "}
          </button>
        </div>
        {payment ? (
          <Payment
            film={film}
            handlePayment={this.props.handlePayment}
            _minusFilm={this._minusFilm}
          />
        ) : null}
        <div className="ImageInfo-Column">
          <table className="ImagInfo-Detail">
            <tbody>
              <tr>
                <td>이미지 타입</td>
                <td>{imgType}</td>
              </tr>
              <tr>
                <td>사이즈</td> {/* 사이즈 추가, 업로드 날짜 추가 다운로드 추가 */}
                <td>{imgWidth+" x "+imgHeight}</td>
              </tr>
              <tr>
                <td> 업로드 날짜 </td>
                <td>{uploadDate}</td>
              </tr>
              <tr>
                <td> 다운로드 </td>
                <td>{downCount}</td>
              </tr>
              <tr>
                <td> 카테고리 </td>
                <td>{category}</td>
              </tr>
              <tr>
                <td> 태그 </td>
                {/* <td>{tags.map(tag => ` ${tag}`)}</td> */}
                <td>{tag}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function Registrant({ userID }) {
  return (
    <div className="ImageInfo-Column Registrant">
      <div className="Registrant-Image">
        {/* <img
          src={
            registrant.profileImage
              ? registrant.profileImage
              : "https://postfiles.pstatic.net/MjAxOTA3MzBfMjgy/MDAxNTY0NDkxNDIxOTA3.PDvjdx3QnWA0Bty0KXQAd9IBixEYYBZ7vk3UfijmqlQg.lWtF8Jrtmh-Kv4hra3IXNlY4z3I15DpiPkdh6NiGLC0g.PNG.she2325/%E3%85%81%E3%85%82.png?type=w966"
          }
          alt={registrant.nickname}
        /> */}
              <img
          src={
              "https://postfiles.pstatic.net/MjAxOTA3MzBfMjgy/MDAxNTY0NDkxNDIxOTA3.PDvjdx3QnWA0Bty0KXQAd9IBixEYYBZ7vk3UfijmqlQg.lWtF8Jrtmh-Kv4hra3IXNlY4z3I15DpiPkdh6NiGLC0g.PNG.she2325/%E3%85%81%E3%85%82.png?type=w966"
          }
          alt={userID}
        />
      </div>
      <div className="Registrant-Info">
        {/* <span className="Nickname"> {registrant.nickname} </span> */}
        <span className="Nickname"> {userID} </span>
        <span className="Id"> {"@" + userID} </span>
        {/* <span className="Id"> {"@" + registrant.id} </span> */}
      </div>
      {/* {registrant.follow != null && (
        <div className="Follow-Btn">
          <button
            className={registrant.follow === true ? "Following" : "Follow"}
          >
            {registrant.follow === true ? "Following" : "Follow"}
          </button>
        </div>
      )} */}
        {userID != null && (
        <div className="Follow-Btn">
          <button
            className={userID === true ? "Following" : "Follow"}
          >
            {userID === true ? "Following" : "Follow"}
          </button>
        </div>
      )}
    </div>
  );
}
export default withRouter(ImageInfo);
