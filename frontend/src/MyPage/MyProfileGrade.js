import './MyProfileGrade.css';
import React, {Component} from 'react';

class MyProfileGrade extends Component {
    state = {
        isGradeOpen: false
    }

    openGrade = () => {
        this.setState({isGradeOpen: true});
    }
    closeGrade = () => {
        this.setState({isGradeOpen: false});
    }
    gradeOnClick = (e) => {
        this.state.isGradeOpen ? this.closeGrade() : this.openGrade();
    }
    render(){
        return (
            <div>
                <button className="Profile-Grade" onClick = {this.gradeOnClick}> 작가 등급 </button>
                <GradeModal isOpen={this.state.isGradeOpen} close={this.closeGrade} name={this.props.name} grade={this.props.grade}/>
            </div>
        );
    }
};

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

export default MyProfileGrade;