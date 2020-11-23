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
        if (props.testScores !== undefined) {
            for (let test of props.testScores) {
                sc += test.score;
                weeks++;
            }
            sc = sc / weeks;
        }

        return sc;
    }

    /**
     * This field will hold the last test score the associate got.
     */
    const score = () => {

        let value = 0;
        let i = 0;
        let size = 0;
        if (props.testScores?.length != undefined) {
            size = props.testScores.length;
        }

        /**
         * If there are no test scores, return 0.
         * Otherwise, set the value to be equal to the last test.
         */
        if (props.testScores !== undefined) {
            while (i < size) {
                /**
                * For each item in test scores, change the value to match.
                * When it stops iterating, we'll have the last value.
                */
                value = props.testScores[i].score;
                i++;
            }
        }
        return value;
    }

    //there is one place here where fake data will be replaced with props
    /**
     * This function returns the TSX element itself.
     * It contains a button to toggle a card,
     * a card that holds the associate's information,
     * and another component, AssociateCardModal, which takes the associate object as props.
     */
    return (
        <li>
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
                    <AssociateCardModal {...fakeData} />
                </div>
            </Card>
        </li>
    )

}