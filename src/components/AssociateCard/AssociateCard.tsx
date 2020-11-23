import React from 'react';
import { Card } from 'reactstrap';
import { AssociateCardModal } from './AssociateCardModal';
import '../../scss/associate-card.scss'
import { IAssociateSingle } from '../../_reducers/AssociateReducer'

/**
 * This component shows a card giving some brief information about an associate.
 * Takes in props containing information about the associate.
 * @param props - Type: IAssociate {firstName, lastName, testScores, techScores}
 * 
 * @returns TSX Element to render
 */
export const AssociateCard: React.FC<IAssociateSingle> = (props: IAssociateSingle) => {


    const fakeData: IAssociateSingle = { //just for testing purposes

        firstName: "Bill",
        lastName: "Gates",
        grades: [{
            dateReceived: "2020-10-21",
            gradeId: 2,
            score: 90,
            traineeId: "TR-1111"
        },
        {
            dateReceived: "2020-10-14",
            gradeId: 1,
            score: 60,
            traineeId: "TR-1111"
        },
        {
            dateReceived: "2020-10-28",
            gradeId: 3,
            score: 72,
            traineeId: "TR-1111"
        }
        ],
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

    /**
     * This field will calculate the average test score of the associate.
     */
    const avg = () => {

        let sc = 0;
        let weeks = 0;

        /** 
         * If the list of scores is empty, don't iterate through.
         * Otherwise, add each test score to a total, divide by the number of scores,
         * and return the average score
         */
        if (props.grades !== undefined) {
            for (let test of props.grades) {
                sc += test.score;
                weeks++;
            }
            sc = sc / weeks;
        }

        return sc.toFixed(2);
    }

    /**
     * This field will hold the last test score the associate got.
     */
    const score = () => {

        let value = 0;
        let i = 0;
        let size = 0;
        let gId = 0;
        if (props.grades?.length != undefined) {
            size = props.grades.length;
        }

        /**
         * If there are no test scores, return 0.
         * Otherwise, set the value to be equal to the last test.
         */
        if (props.grades !== undefined) {
            while (i < size) {
                /**
                * For each item in test scores, if the gradeId is greater than the held one, change the value to match.
                * When it stops iterating, we'll have the last value.
                */
                if (props.grades[i].gradeId > gId) {
                    value = props.grades[i].score;
                    gId = props.grades[i].gradeId;
                }
                i++;
            }
        }
        return value.toFixed(2);
    }

    /**
     * This function returns the TSX element itself.
     * It contains a button to toggle a card,
     * a card that holds the associate's information,
     * and another component, AssociateCardModal, which takes the associate object as props.
     */
    return (
        <div  style={{padding: "5px"}}>
            <Card className="aso-card">
                <div>
                    <h5 id="nameHolder" font-family={"$rev-font"}>{props.firstName} {props.lastName}</h5>
                    <h5 font-family={"$rev-font"}>Average:</h5>
                    <h4 id="averageHolder" font-family={"$rev-font"}>{avg()}%</h4>
                </div>
                <div>
                    <h5 id="scoreHolder">Latest Test Score: {score()}%</h5>
                </div>
                <div style={{ display: "block", textAlign: "center", alignContent: "center", justifyContent: "center" }}>
                    <AssociateCardModal {...props} />
                </div>
            </Card>

        </div>
    )

}