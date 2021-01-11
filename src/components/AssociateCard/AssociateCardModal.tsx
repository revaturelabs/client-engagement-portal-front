import React from 'react';
import { Modal, ModalBody, Row, ModalHeader } from 'reactstrap';
import '../../scss/associate-card.scss';
import {Associate} from '../../types'


/**
 * @function AssociateCardModal * 
 * This component shows a modal that gives information about an associate.
 * Takes in props containing information about the associate.
 * 
 * @param props - Type: IAssociateSingle {firstName, lastName, grades, testScores, techScores}
 *
 * @returns TSX Element to render
 */
export const AssociateCardModal:React.FC<Associate> = (props:Associate) => {

    /**
     * @function toggle
     * The toggle and the show state determines if this modal component is showing.
     */
    const [show, setShow] = React.useState(false);
    const toggle = () => setShow(!show);

    /**
     * This will map the grades and date the grade was received to TSX elements,
     * as well as calculate the average grade.
     */
    let gradeMap;
    let averageGrade = 0;
    if(props.grades !== undefined){
        let numGrades = 0;
        gradeMap = props.grades.map((g) => <div id="grade" key={g.gradeId}><p>Date {g.dateReceived}: {g.score.toFixed(2)}%</p><div className="h-divider"></div></div>);
        for(const grade of props.grades){

            averageGrade += grade.score;
            numGrades++;
        }
        averageGrade = averageGrade / numGrades;
    }

    /**
     * @function return
     * This function returns the TSX element itself.
     * It contains fields to hold the associates name, their average test score,
     * and all of their test scores.
     */
    return (
        <>
                <button id="openBtn" className="view-btn" onClick={toggle}>View</button>
                <Modal isOpen={show} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <h3 id="associateName">{props.firstName} {props.lastName}</h3>
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
                             <div id="gradeMap">{gradeMap}</div>
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
