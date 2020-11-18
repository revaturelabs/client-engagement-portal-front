import React from 'react';
import { Card, Modal, Button, ModalBody, Row } from 'reactstrap';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'
import '../../scss/associate-card.scss';
import {IAssociate} from '../../_reducers/AssociateReducer'


/**
 * This component shows a modal that gives information about an associate.
 * Takes in props containing information about the associate.
 * @param props - Type: IProps {firstName, lastName, profilePic, testScores, techScores}
 * 
 * @returns TSX Element to render
 */
export const AssociateCardModal:React.FC<IAssociate> = (props:IAssociate) => {

    //  this is for the modal functionality
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // this will create the list of weekly scores that we will render below
    const tests = props.testScores;
    let testMap;
    let averageTest = 0;
    let testWeek = 0;
    if(tests === undefined){
        
    } else{
        testMap = tests.map((test) => <div><p>Week {test.week}: {test.score}%</p><div className="h-divider"></div></div>);
        for(let test of tests){
            averageTest += test.score;
            testWeek++;
        }
        averageTest = averageTest / testWeek;
    }

    // this will create the list of tech skill and score that we will render below
    const techs = props.techScores;
    let techMap;
    let averageTech = 0;
    let techWeek = 0;
    if(techs === undefined){

    } else{
        techMap = techs.map((techs) => <div><p>{techs.tech}: {techs.score}%</p><div className="h-divider"></div></div>);
        for(let tech of techs){
            averageTech += tech.score;
            techWeek++;
        } 
        averageTech = averageTech / techWeek;
    } 

    return (
        <body style={{display:"flex", alignContent:"center", margin:"auto"}}>
            <Button className="view-btn" onClick={handleShow}>View</Button>
            <Modal
                isOpen={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="aso-modal-card" 

            >   
                <ModalBody className="aso-modal-body">
                {/* <Card className="rev-card" style={{ margin: "auto",  width: "50%" }}> */}
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
                            <div>{testMap}</div>
                        </div>
                        {/* div for average grade */}
                        <div className="aso-average col-1">
                            <h6>Average</h6>
                            <h6>{averageTest}%</h6>
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
                            <h6>{averageTech}%</h6>
                        </div>
                    </Row>
                    
                </div>
                {/* </Card>  */}
                <Button className="view-btn" onClick={handleClose}>Close</Button>
                </ModalBody>            
            </Modal>
        </body>
    )
}