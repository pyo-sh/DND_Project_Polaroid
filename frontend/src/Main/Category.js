import React, {Component} from 'react';
import Photos from './Photos';
import SideContent from './SideContent';
import './Category.css';

class Category extends Component {
    upperTitle(){
        let title = this.props.match.params.category;
        title = title.replace('-',' ');
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    explanation(){
        let exp = "";
        switch(this.props.match.params.category){
            case "daily" : exp = "오늘 가장 인기 있는 작품"; break;
            case "weekly" : exp = "이번 주 가장 인기 있는 작품"; break;
            case "monthly" : exp = "이번  달 가장 인기 있는 작품"; break;
            case "wallpaper" : exp = "컴퓨터,모바일 화면을 위한 HD 배경화면"; break;
            case "nature" : exp = "광할하고 아름다운 지구의 자연환경"; break;
            case "fashion" : exp = "자신의 개성을 추구하는 사람들의 스타일"; break;
            case "illustration" : exp = "인터넷상의 작은 미술관"; break;
            case "art-Works" : exp = "현실과 가상의 만남"; break;
            case "people" : exp = "초상화부터 사람들의 일상까지"; break;
            case "patterns" : exp = "고품질의 다양한 텍스쳐"; break;
            case "architecture" : exp = "전 세계의 건축물에 대한 새로운 감상"; break;
            case "business" : exp = "사회인들의 치열함"; break;
            case "animals" : exp = "자연계의 아룸다운 야생동물"; break;
            case "travel" : exp = "설레는 여행의 순간"; break;
            case "food" : exp = "가장 행복한 순간"; break;
            default : break;
        }
        return exp;
    }

    render(){
        return (
            <div className = "Content">
                <div className = "Content-Left">
                    <div className = "Category-information">
                        <div className = "Title">{this.upperTitle()}</div>
                        <p className = "Explanation">{this.explanation()}</p>
                        <Photos category = {this.props.match.params.category}/>
                    </div>
                </div>
                <div className = "Content-Right">
                    <SideContent Category = {this.props.match.params.category}/> 
                </div>
            </div>
        )
    }
}

export default Category;
