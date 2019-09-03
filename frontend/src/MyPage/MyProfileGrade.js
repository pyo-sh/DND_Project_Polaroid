import './MyProfileGrade.css';
import React, {Component} from 'react';

class MyProfileGrade extends Component {
    state = {
        isGradeOpen: false
    }

    // 작가 등급버튼을 클릭하였을 때, 클릭이 된 상태인지 아닌 상태인지 작동하기 위한 버튼 함수
    openGrade = () => {
        this.setState({isGradeOpen: true});
    }
    closeGrade = () => {
        this.setState({isGradeOpen: false});
    }
    gradeOnClick = (e) => {
        this.state.isGradeOpen ? this.closeGrade() : this.openGrade();
    }

    // 마이페이지와 다른사람페이지에서 출력하는 등급의 Div가 다르므로 함수 만듦
    renderGradeModal = () => {
        if(this.props.checkProfile)
            return <GradeModal isOpen={this.state.isGradeOpen} close={this.closeGrade} name={this.props.name} grade={this.props.grade}/>
        else
            return <GradeModalAnother isOpen={this.state.isGradeOpen} close={this.closeGrade} name={this.props.name} grade={this.props.grade}/>
    }

    render(){
        return (
            <div>
                <button className="Profile-Grade" onClick = {this.gradeOnClick}> {this.props.grade} 작가 </button>
                {this.renderGradeModal()}
            </div>
        );
    }
};

// 마이페이지에서 출력하는 등급페이지
const GradeModal = ({ isOpen, close, name, grade }) => {
    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="Grade-Modal-Overlay" onClick={close} />
                    <div className="Grade-Modal">
                        <h3 className="Grade-Title">{name}님의 등급은 {grade}입니다.</h3>
                        <div className="Grade-Content">
                            <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora nulla, non molestiae dicta ducimus. Et unde laborum eveniet ex quod doloribus quae, aliquam beatae atque, vero assumenda rem quo?
                            </p>
                        </div>
                        <h3 className="Grade-Title">등급변환을 신청하시겠습니까?</h3>
                        <div className="Grade-Button-Wrap">
                            <button className="Grade-Button1" onClick={close}>CANCEL</button>
                            <button className="Grade-Button2" onClick={close}>CONFIRM</button>
                        </div>
                    </div>
                </React.Fragment>

                :
                null
            }
        </React.Fragment>
    )
}

// 다른사람페이지에서 출력하는 등급페이지
const GradeModalAnother = ({ isOpen, close, name, grade }) => {
    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="Grade-Modal-Overlay" onClick={close} />
                    <div className="Grade-Modal">
                        <h3 className="Grade-Title">{name}님의 등급은 {grade}입니다.</h3>
                        <div className="Grade-Content">
                            <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora nulla, non molestiae dicta ducimus. Et unde laborum eveniet ex quod doloribus quae, aliquam beatae atque, vero assumenda rem quo?
                            </p>
                        </div>
                        <div className="Grade-Button-Wrap">
                            <button className="Grade-Button2-Another" onClick={close}>CONFIRM</button>
                        </div>
                    </div>
                </React.Fragment>
                :
                null
            }
        </React.Fragment>
    )
}

export default MyProfileGrade;