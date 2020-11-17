import React from 'react';
import { Card, Modal, Button, ModalBody } from 'reactstrap';
import { isPropertySignature } from 'typescript';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'
import '../../scss/associate-card.scss';

interface IProps{
    profilePic:string,
    firstName:string,
    lastName:string
    testScores:{
        week:number,
        score:number
    }[],
    techScores:{
        tech:string,
        score:number
    }[]
};

export const AssociateCardModal:React.FC<any> = (props:IProps) => {

    //  this is for the modal functionality
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
/*
    // this will create the list of weekly scores that we will render below
    const tests = props.testScores;
    const testMap = tests.map((test) => <p>Week {test.week}: {test.score}%</p>);

    // this will create the list of tech skill and score that we will render below
    const techs = props.techScores;
    const techMap = props.techScores.map((techs) => <p>{techs.tech}: {techs.score}%</p>);
*/

    /*
        For the averages, we could do some sort of for loop
        maybe something like this?
        yeah
        I'm gonna comment out some code for now, it's not compiling, and I want to push since this functionality is getting talked about a lot
    */

    /*
    let averageTest = 0;
    let averageTech = 0;

    for(let test of tests){
        averageTech += test.score;
    }
    for(let tech of techs){
        averageTech += tech.score;
    } */

    /* https://reactjs.org/docs/lists-and-keys.html
        props.map((props.testScores) => <p>Week {props.testScores.week}: {props.testScores.score}% </p> )
        const x = props.map (...)
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
                    <div style={{ display: "inline-block"}}>
                        {/* Week #    grade% */}
                        <div>{/*testMap*/}</div>
                    </div>
                    {/* div for average grade */}
                    <div style={{ display: "inline-block"}}>
                        <h3>Average</h3>
                        <h2>{/*averageTest*/}%</h2>
                    </div>
                </div>
                {/* div for past quiz scores */}
                <div>
                    {/* div for scroll area */}
                    <div style={{ display: "inline-block"}}>
                        {/* Quiz name   grade% */}
                        <div>{/*techMap*/}</div>
                    </div>
                    {/* div for average grade */}
                    <div style={{ display: "inline-block"}}>
                        <h3>Average</h3>
                        <h2>{/*averageTech*/}%</h2>
                    </div>
                </div>
                {/* </Card>  */}
                </ModalBody>            
            </Modal>
        </body>
    )
}