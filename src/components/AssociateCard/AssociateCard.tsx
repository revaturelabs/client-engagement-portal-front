import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Row } from 'reactstrap';
import { AssociateCardModal } from './AssociateCardModal';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'
import '../../scss/associate-card.scss'

//this interface will take in information about each associate
interface IProps{
    profilePic:string,
    firstName:string,
    lastName:string,
    testScores:{
        week:number,
        score:number
    }[],
    techScores:{
        tech:string,
        score:number
    }[]
};

//This component displays the associate's information on a batch's page.
export const AssociateCard:React.FC<any> = (props:IProps) => {

    // props.testScores = [{
    //     week:1,
    //     score:90
    // }];
    // props.techScores = [{
    //     tech:"Java",
    //     score:80
    // }];

    // const fakeTest = {week:1,score:90};
    // const fakeTech = {tech:"Java",score:80}

    // props.testScores.push(fakeTest);
    // props.techScores.push(fakeTech);

    //this variable will hold the last test score the associate got
    const score = () => {

        let value = 0;
        let i = 0;

        //for each item in test scores, change value to match
        for(;props.testScores[i];){
            value = props.testScores[i].score;
        }

        //and then return value
        return value;
    }


    return (
        <body>
            <Card className="aso-card" >
               {/* div for image and name */}
               <div>
                   <h5 font-family={"$rev-font"}>{props.firstName} {props.lastName}Test User</h5>
                   <img className="pic" src={props.profilePic} alt="associate_profile_pic"/>
               </div>
               {/* div for past quiz grades */}
               <div>
                   <h5>Latest Test Score: {score}%</h5>
               </div>
               {/* div for holding the modal button */}
               <div style={{display:"block", textAlign:"center", alignContent:"center", justifyContent:"center"}}>
                    <AssociateCardModal props/>
               </div>
               
           </Card>
           
        </body>
    )

}