import React from 'react';
import { Modal, Button, ModalBody, Row, ModalHeader } from 'reactstrap';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'
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
    const tests = props.testScores;
    let testMap;
    let averageTest = 0;
    let testWeek = 0;
    if(tests !== undefined){
        testMap = tests.map((test) => <div id="weekAndScore"><p>Week {test.week}: {test.score}%</p><div className="h-divider"></div></div>);
        for(let test of tests){
            averageTest += test.score;
            testWeek++;
        }
        averageTest = averageTest / testWeek;
    }

    /**
     * This will map the associate's tech and tech score into TSX elements.
     * As well as calculate the average tech score
     */
    const techs = props.techScores;
    let techMap;
    let averageTech = 0;
    let techWeek = 0;
    /**
     * If list of techs in empty don't iterate through.
     * Otherwise calculate the total score and divide by total weeks
     * then return the average.
     */
    if(techs !== undefined){
        techMap = techs.map((techs) => <div id="techAndScore"><p>{techs.tech}: {techs.score}%</p><div className="h-divider"></div></div>);
        for(let tech of techs){
            averageTech += tech.score;
            techWeek++;
        } 
        averageTech = averageTech / techWeek;
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
                        <div className="col-9" style={{maxHeight: "180px"}}>
                        <div>Weekly Assessments</div>
                        <div className="aso-scroll-container">
                            <div className="aso-scroll" >
                            {/* Week #    grade% */}
                             <div id="testMap">{testMap}</div>
                            </div>
                        </div>
                        </div>
                        {/* div for average grade */}
                        <div className="aso-average col-1">
                            <h6>Average</h6>
                            <h6 id="avgTest">{averageTest}%</h6>
                        </div>
                    </Row>
                </div>
                <div className="aso-info">
                    {/* div for scroll area */}
                    <Row>
                        
                        <div className="col-9" style={{maxHeight: "180px"}}>
                        <div>Technology Assessments</div>
                            <div className=" aso-scroll-container">
                                <div className="aso-scroll">
                                    {/* Quiz name grade% */}
                                    <div>{techMap}</div>
                                </div>
                            </div>
                        </div>
                        {/* div for average grade */}

                        <div className="aso-average col-1" /*style={{ display: "inline-block", marginTop: "10px"}}*/>
                            <h6>Average</h6>
                            <h6 id="avgTech">{averageTech}%</h6>
                        </div>
                    </Row>
                    
                </div>
                    </ModalBody>
                </Modal>
        </>
    )
}