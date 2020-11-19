import React from 'react';
import { Modal, Button, ModalBody, Row } from 'reactstrap';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'
import '../../scss/associate-card.scss';
import {IAssociate} from '../../_reducers/AssociateReducer'


/**
 * This component shows a modal that gives information about an associate.
 * Takes in props containing information about the associate.
 * @param props - Type: IAssociate {firstName, lastName, testScores, techScores}
 * 
 * @returns TSX Element to render
 */
export const AssociateCardModal:React.FC<IAssociate> = (props:IAssociate) => {

    /**
     * This state determines if this modal component is showing
     */
    const [show, setShow] = React.useState(false);
    const toggle = () => setShow(!show);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    /**
     * This will map the associate's test scores into TSX elements.
     * As well as calculate the average from the scores.
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
                {/* div for image and name */}
                <div>
                    {/* <img className="pic" src={props.profilePic} alt="associate_profile_pic"/> */}
                    <h3>{props.firstName}</h3>
                    <h4>{props.lastName}</h4>
                </div>
                {/* div for divider */}
                <div className="h-divider"></div>
                {/* div for past assesment scores */}
                <div className="aso-info">
                    <div>Weekly Assessments</div>
                    <Row>
                        <div className="col-1"/>
                        {/* div for scroll area */}
                        <div className="aso-scroll col-8">
                            {/* Week #    grade% */}
                            <div id="testMap">{testMap}</div>
                        </div>
                        {/* div for average grade */}
                        <div className="aso-average col-1">
                            <h6>Average</h6>
                            <h6 id="avgTest">{averageTest}%</h6>
                        </div>
                    </Row>
                </div>
                {/* div for past quiz scores */}
                <div className="aso-info">
                    <div>Technology Assessments</div>
                    {/* div for scroll area */}
                    <Row>
                        <div className="col-1"/>
                        <div className="aso-scroll col-8">
                            {/* Quiz name   grade% */}
                            <div>{techMap}</div>
                        </div>
                        {/* div for average grade */}
                        <div className="aso-average col-1" /*style={{ display: "inline-block", marginTop: "10px"}}*/>
                            <h6>Average</h6>
                            <h6 id="avgTech">{averageTech}%</h6>
                        </div>
                    </Row>
                    
                </div>
                <Button id="closeBtn" className="view-btn" onClick={toggle}>Close</Button>
                </ModalBody>            
            </Modal>
        </body>
    )
}