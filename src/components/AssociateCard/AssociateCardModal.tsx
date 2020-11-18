import React from 'react';
import { Card, Modal, Button, ModalBody } from 'reactstrap';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'
import '../../scss/associate-card.scss';
//import {IProps} from './AssociateCard';

interface IProps{
    firstName?:string,
    lastName?:string,
    profilePic?:string,
    testScores?:{
        week:number,
        score:number
    }[],
    techScores?:{
        tech:string,
        score:number
    }[]
};

//TRY IT NOW, changed how pass props in other class
//I used this https://stackoverflow.com/questions/48240449/type-is-not-assignable-to-type-intrinsicattributes-intrinsicclassattribu

//will be bookmarking that
export const AssociateCardModal:React.FC<IProps> = (props:IProps) => {
//i think we push for now so it can get integrated, and work on css

    //  this is for the modal functionality
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // this will create the list of weekly scores that we will render below
    const tests = props.testScores;
    let testMap;
    let averageTest = 0;
    if(tests === undefined){
        
    } else{
        testMap = tests.map((test) => <p>Week {test.week}: {test.score}%</p>);
        for(let test of tests){
            averageTest += test.score;
        }
    }
    

    // this will create the list of tech skill and score that we will render below
    const techs = props.techScores;
    let techMap;
    let averageTech = 0;
    if(techs === undefined){

    } else{
        techMap = techs.map((techs) => <p>{techs.tech}: {techs.score}%</p>);
        for(let tech of techs){
            averageTech += tech.score;
        } 
    } 

    /* https://reactjs.org/docs/lists-and-keys.html
        */

    return (
        <body style={{display:"flex", alignContent:"center", margin:"auto"}}>
            <Button className="view-btn" onClick={handleShow}>View</Button>
            <Modal
                isOpen={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="rev-card"
            >
                <ModalBody style={{display:"block", margin:"auto", textAlign:"center"}}>
                {/* <Card className="rev-card" style={{ margin: "auto",  width: "50%" }}> */}
                <Button className="view-btn" onClick={handleClose}>Close</Button>
                {/* div for image and name */}
                <div>
                    <img className="pic" src={props.profilePic} alt="associate_profile_pic"/>
                    <h3>{props.firstName}</h3>
                    <h2>{props.lastName}</h2>
                </div>
                {/* div for divider */}
                <div className="h-divider"></div>
                {/* div for past assesment scores */}
                <div>
                    {/* div for scroll area */}
                    <div className="aso-scroll">
                        {/* Week #    grade% */}
                        <div>{testMap}</div>
                    </div>
                    {/* div for average grade */}
                    <div style={{ display: "inline-block"}}>
                        <h6>Average</h6>
                        <h5>{averageTest}%</h5>
                    </div>
                </div>
                {/* div for past quiz scores */}
                <div>
                    {/* div for scroll area */}
                    <div className="aso-scroll">
                        {/* Quiz name   grade% */}
                        <div>{techMap}</div>
                    </div>
                    {/* div for average grade */}
                    <div style={{ display: "inline-block"}}>
                        <h6>Average</h6>
                        <h5>{averageTech}%</h5>
                    </div>
                </div>
                {/* </Card>  */}
                </ModalBody>            
            </Modal>
        </body>
    )
}