import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Row } from 'reactstrap';
import { AssociateCardModal } from './AssociateCardModal';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'
import '../../scss/associate-card.scss'
import {IAssociate} from '../../_reducers/AssociateReducer'

//This component displays the associate's information on a batch's page.
export const AssociateCard: React.FC<IAssociate> = (props: IAssociate) => {

    const [isHidden, setHidden] = React.useState(true);
    const handleHide = () => setHidden(!isHidden);

    //just for testing purposes
    const fakeData: IAssociate = {
        firstName: "Bill",
        lastName: "Gates",
        testScores: [{
            week: 1,
            score: 90
        }, {
            week: 2,
            score: 80
        }, {
            week: 3,
            score: 70
        }, {
            week: 4,
            score: 50
        }],
        techScores: [{
            tech: "Java",
            score: 80
        }, {
            tech: "React",
            score: 70
        }, {
            tech: "SQL",
            score: 90
        }]
    };

    //the variable will hold the average test score of the associate
    const avg = () => {

        let sc = 0;
        let weeks = 0;

        //if testScores is unndefined, don't iterate
        if (props.testScores === undefined) {
        } else {
            for (let test of props.testScores) {
                sc += test.score;
                weeks++;
            }
            sc = sc / weeks;
        }

        return sc;
    }

    //this variable will hold the last test score the associate got
    const score = () => {

        let value = 0;
        let i = 0;

        //if testScores is undefined, don't change the value
        if (props.testScores === undefined) {

        } else {
            for (; props.testScores[i];) {
                //for each item in test scores, change value to match.
                //when it stops iterating, we'll have the last value
                value = props.testScores[i].score;
                i++;
            }
        }

        //and then return value
        return value;
    }

    //there are four places here where fake data will be replaced with props
    return (
        <body>
            <Button onClick={handleHide}>Associates</Button>
            <Card className="aso-card" hidden={isHidden}>
                {/* div for image and name */}
                <div>
                    <h5 font-family={"$rev-font"}>{fakeData.firstName} {fakeData.lastName}</h5>
                    {/* <img className="pic" src={fakeData.profilePic} alt="associate_profile_pic" /> */}
                    <h5 font-family={"$rev-font"}>Average:</h5>
                    <h4 font-family={"$rev-font"}>{avg()}%</h4>
                </div>
                {/* div for past quiz grades */}
                <div>
                    <h5>Latest Test Score: {score()}%</h5>
                </div>
                {/* div for holding the modal button */}
                <div style={{ display: "block", textAlign: "center", alignContent: "center", justifyContent: "center" }}>
                    <AssociateCardModal {...fakeData} />
                </div>

            </Card>

        </body>
    )

}