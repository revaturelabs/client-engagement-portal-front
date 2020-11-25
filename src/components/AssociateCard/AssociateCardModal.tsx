import React from 'react';
import { Modal, Button, ModalBody, Row } from 'reactstrap';
import '../../scss/associate-card.scss';
import {IAssociateSingle} from '../../_reducers/AssociateReducer'


/**
 * This component shows a modal that gives information about an associate.
 * Takes in props containing information about the associate.
 * @param props - Type: IAssociate {firstName, lastName, testScores, techScores}
 * 
 * @returns TSX Element to render
 */
export const AssociateCardModal:React.FC<IAssociateSingle> = (props:IAssociateSingle) => {

    /**
     * This state determines if this modal component is showing.
     */
    const [show, setShow] = React.useState(false);
    const toggle = () => setShow(!show);

    /**
     * This will map the grades and date grade was recieved to TSX elements.
     * As well as calculate the average grade.
     */
    let gradeMap;
    let averageGrade = 0;
    if(props.grades !== undefined){
        let numGrades = 0;
        for(let grade of props.grades){
            gradeMap = props.grades.map(() => <div id="grade"><p>Date {grade.dateReceived}: {grade.score.toFixed(2)}%</p><div className="h-divider"></div></div>);
            averageGrade += grade.score;
            numGrades++;
        }
        //averageTest = averageTest / testWeek;
    }

    return (
        <body style={{display:"flex", alignContent:"center", margin:"auto"}}>
            <Button id="openBtn" className="view-btn" onClick={toggle}>View</Button>
            <Modal
                isOpen={show}
                onHide={toggle}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="aso-modal-card" 

            >   
                <ModalBody className="aso-modal-body">
                <div>
                    {/* <img className="pic" src={props.profilePic} alt="associate_profile_pic"/> */}
                    <h3 id="firstName">{props.firstName}</h3>
                    <h4 id="lastName">{props.lastName}</h4>
                </div>
                <div className="h-divider"></div>
                <div className="aso-info">
                    <div>Weekly Assessments</div>
                    <Row>
                        <div className="col-1"/>
                        <div className="aso-scroll col-8">
                            <div id="testMap">{gradeMap}</div>
                        </div>
                        {/* div for average grade */}
                        <div className="aso-average col-1">
                            <h6>Average</h6>
                            <h6 id="avgGrade">{averageGrade.toFixed(2)}%</h6>
                        </div>
                    </Row>
                    
                </div>
                    </ModalBody>
                </Modal>
        </body>
    )
}
