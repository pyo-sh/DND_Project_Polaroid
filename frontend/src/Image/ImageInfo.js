import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ImageInfo.css";
import Payment from "./Payment";
import { getFilm, minusFilm } from "./ImageFunction";
import jwt_decode from "jwt-decode";
import { withRouter } from 'react-router-dom';
import AWS from 'aws-sdk';
import {awsconfig} from '../Upload/awsconfig';
import axios from "axios";


Registrant.protoType = {
  registrant: {
    profileImage: PropTypes.string,
    nickname: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }
};

class ImageInfo extends Component {
  state = {
    img : {},
    registrant: "",
    paid: "",
    type: "",
    size: "",
    uploadDate: "",
    download: "",
    kategorie: "",
    tags: [],
    payment: "",
    film: 0
  };

  componentDidMount() {
    const imgID = this.props.match.params.id
    axios.get(`/api/images/getOneImg/${imgID}`).then(result => {

    })
    const {
      registrant,
      paid,
      type,
      size,
      uploadDate,
      download,
      kategorie,
      tags,
      payment
    } = this.props;
    this.setState({
      registrant,
      paid,
      type,
      size,
      uploadDate,
      download,
      kategorie,
      tags,
      payment
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const {
        registrant,
        paid,
        type,
        size,
        uploadDate,
        download,
        kategorie,
        tags,
        payment
      } = this.props;
      this.setState({
        registrant,
        paid,
        type,
        size,
        uploadDate,
        download,
        kategorie,
        tags,
        payment
      });
    }
  }
  _getFilm = () => {
    let token = "";
    localStorage.usertoken
      ? (token = localStorage.getItem("usertoken"))
      : (token = sessionStorage.getItem("usertoken"));
    const decode = jwt_decode(token);
    const ID = decode.ID;
    console.log("userID" + ID);
    getFilm(ID).then(film => {
      this.setState({
        film
      });
    });
  };
  _minusFilm = price => {
    let token = "";
    localStorage.usertoken
      ? (token = localStorage.getItem("usertoken"))
      : (token = sessionStorage.getItem("usertoken"));
    const decode = jwt_decode(token);
    const ID = decode.ID;
    const filmNum = price;
    const info = {
      ID,
      filmNum
    };
    minusFilm(info);
  };

  downloadClick = () => {
    let {imgUrl} = this.state;
    let urlArray = imgUrl.split("/")
    let bucket = urlArray[2]
    let realBucket = bucket.split('.');
    realBucket = realBucket[0];
    console.log(realBucket)
    // let Key = urlArray[4];
    let Key = `${urlArray[3]}/${urlArray[4]}`;
    let imgName = urlArray[4];
    console.log(Key);
    let s3 = new AWS.S3({accessKeyId:awsconfig.accessKeyId, secretAccessKey : awsconfig.secretAccessKey});
    let params = {Bucket: realBucket, Key: Key}
    s3.getObject(params, (err, data) => {
      console.log(err);
      console.log(data);
      let blob=new Blob([data.Body], {type: data.ContentType});
      let link=document.createElement('a');
      const url=window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download',`${imgName}.${data.ContentType}`);
      document.body.appendChild(link);
      link.click();
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
      registrant,
      paid,
      type,
      size,
      uploadDate,
      download,
      kategorie,
      tags,
      payment,
      film
    } = this.state;
    return (
      <div className="ImageInfo">
        <Registrant registrant={registrant} />
        <div className="ImageInfo-Column Download">
          <button className={paid ? "Premium" : "Free"} onClick={this.onClick}>
            {" "}
            {paid ? "Premium Download" : "Free Download"}{" "}
          </button>
        </div>
        {payment ? (
          <Payment
            film={film}
            handlePayment={this.props.handlePayment}
            _minusFilm={this._minusFilm}
            commercialAvailable = "NotCommercialAvailable"
            copyrightNotice = "CopyrightNotice"
            noChange = "NoChange"
          />
        ) : null}
        <div className="ImageInfo-Column">
          <table className="ImagInfo-Detail">
            <tbody>
              <tr>
                <td>이미지 타입</td>
                <td>{type}</td>
              </tr>
              <tr>
                <td>사이즈</td>
                <td>{size}</td>
              </tr>
              <tr>
                <td> 업로드 날짜 </td>
                <td>{uploadDate}</td>
              </tr>
              <tr>
                <td> 다운로드 </td>
                <td>{download}</td>
              </tr>
              <tr>
                <td> 카테고리 </td>
                <td>{kategorie}</td>
              </tr>
              <tr>
                <td> 태그 </td>
                <td>{tags.map(tag => ` ${tag}`)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function Registrant({ registrant }) {
  return (
    <div className="ImageInfo-Column Registrant">
      <div className="Registrant-Image">
        <img
          src={
            registrant.profileImage
              ? registrant.profileImage
              :  require("../img/User.svg")
          }
          alt={registrant.nickname}
        ></img>
      </div>
      <div className="Registrant-Info">
        <span className="Nickname"> {registrant.nickname} </span>
        <span className="Id"> {"@" + registrant.id} </span>
      </div>
      {registrant.follow != null && (
        <div className="Follow-Btn">
          <button className={registrant.follow === true ? "Following" : "Follow"}>
            {registrant.follow === true ? "Following" : "Follow"}
          </button>
        </div>
      )}
    </div>
  );
}
export default withRouter(ImageInfo);
