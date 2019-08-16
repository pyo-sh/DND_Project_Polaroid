import React from "react";
import "./Upload.css";

function Upload() {
  return (
    <div className="App">
      <div className="Frame">
        <div className="Letter">UPLOAD</div>
        <div className="Frame-in">
          <img className="Image"src="https://cdn.pixabay.com/photo/2016/10/22/05/01/sky-1759807_960_720.jpg" alt=""></img>
          <div className="Category">카테고리
          <select className="categoryDropBox">
            <option vlaue='' selected>--선택--</option>
            <option vlaue='Wallpaper'>Wallpaper</option>
            <option vlaue='Nature'>Nature</option>
            <option vlaue='Fashion'>Fashion</option>
            <option vlaue='Illustration'>Illustration</option>
            <option vlaue='Art Works'>Art Works</option>
          </select>
          </div>
          <div className="Tag">태그
          <input className="TagInput" type="text" name="태그" placeholder="쉼표로 구분"></input>
          </div>
          <div className="TagExpl">3개 이상</div>
          <div className="Distribute">
            <input className="free" type='radio' name='Distribute' value='free'/>무료배포
            <input className="charge" type='radio' name='Distribute' value='charge'/>유료배포
           </div>
          <div className="Caution">선택한 배포의 형태에 따른 주의 문구</div>
          <div className="Visibility">
            <input className="public" type='radio' name='visibility' value='public'/>공개
            <input className="private" type='radio' name='visibility' value='private'/>비공개
          </div>
          <button className="Btn" >업로드</button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
