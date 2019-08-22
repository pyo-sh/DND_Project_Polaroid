import React, { Component } from 'react';
import './MyPageBenefit.css';
import BenefitChart from './BenefitChart';

class MyPageBenefit extends Component {
    state = {
        benefitButton: "월간 수익"
    }
    render() {
        return (
            <div>
                <div className="Benefit-Button">
                    <BenefitButton className = "" title="주간 수익" BenefitOnClick={this.BenefitOnClick}/>
                    <BenefitButton className = "Benefit-Button-Selected" title="월간 수익" BenefitOnClick={this.BenefitOnClick}/>
                </div>
                <div className="Benefit-Chart">
                    {this._setChart()}
                </div>
                <div className="Benefit-Value">
                    <div>업로드된 사진 : {}</div>
                    <div>다운로드 횟수 : </div>
                    <div>총 수익 : </div>
                </div>
                <div className="Benefit-Detail">
                    세부사항

                </div>
            </div>
        );
    }
    _setChart = () => {
        const type = this.state.benefitButton;
        switch(type){
            case "월간 수익": return <BenefitChart Data={this.props.profile.benefit.monthData}/>;
            case "주간 수익": return <BenefitChart Data={this.props.profile.benefit.weekData}/>;
            default: return null;
        }
    }
    BenefitOnClick = (e) => {
        if(e.target.className === "Benefit-Button-Selected"){}
        else{
            let children = [...e.target.parentNode.children];
            children.map((child) => {
                child.className = "";
                return null;
            })
            e.target.className = "Benefit-Button-Selected";
            this.setState(
                {benefitButton: e.target.innerText});
        }
        return null;
    }
}

const BenefitButton = ({title, BenefitOnClick, className}) => {
    return <button className={className} onClick={BenefitOnClick}>{title}</button>
}

export default MyPageBenefit;