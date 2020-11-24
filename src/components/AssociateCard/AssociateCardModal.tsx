import React from 'react';
import { Modal, Button, ModalBody, Row, ModalHeader } from 'reactstrap';
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
        averageGrade = averageGrade/ numGrades;
    }

    return (
        <>
                <Button id="openBtn" className="view-btn" onClick={toggle}>View</Button>
                <Modal isOpen={show} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <h3>{props.firstName} {props.lastName}</h3>
                    </ModalHeader>
                    <ModalBody>
                    <div className="aso-info">
                    <Row>
                        {/* div for scroll area */}
                        <div className="col-9" style={{maxHeight: "400px"}}>
                        <div>Weekly Assessments</div>
                        <div className="aso-scroll-container">
                            <div className="aso-scroll" >
                            {/* Week #    grade% */}
                             <div id="testMap">{gradeMap}</div>
                            </div>
                        </div>
                        </div>
                        {/* div for average grade */}
                        <div className="aso-average col-1">
                            <h6>Average</h6>
                            <h6 id="avgTest">{averageGrade.toFixed(2)}%</h6>
                        </div>
                    </Row>
                </div>
                    </ModalBody>
                </Modal>
        </>
    )
}
