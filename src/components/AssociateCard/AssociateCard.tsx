import React from 'react';
import { AssociateCardModal } from './AssociateCardModal';
import '../../scss/associate-card.scss'
import { IAssociateSingle } from '../../_reducers/AssociateReducer'
import { Col, Row } from 'reactstrap';
import { ProgressBar } from 'react-bootstrap'

/**
 * @function AssociateCard
 * This component shows a card giving some brief information about an associate.
 * Takes in props containing information about the associate.
 * 
 * @param props - Type: IAssociateSingle {firstName, lastName, grades, testScores, techScores}
 *
 * @returns TSX Element to render
 */
export const AssociateCard: React.FC<IAssociateSingle> = (props: IAssociateSingle) => {

    /**
     * @constant avg
     * This field will calculate the average test score of the associate.
     * 
     * @returns sc.toFixed(2), the average test score to two decimal places.
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
            for (const test of props.grades) {
                sc += test.score;
                weeks++;
            }
            sc = sc / weeks;
        }

        return sc.toFixed(2);
    };

    /**
     * @constant score
     * This field will hold the last test score the associate got.
     * 
     * @returns value.toFixed(2), the value of the last test score to two decimal places.
     */
    const score = () => {

        let value = 0;
        let i = 0;
        let size = 0;
        let gId = 0;
        if (props.grades?.length !== undefined) {
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
     * @function return
     * 
     * This function returns the TSX element itself.
     * It contains a button to toggle a card,
     * a card that holds the associate's information,
     * and another component, AssociateCardModal, which takes the associate object as props.
     */

    const average: number = +avg() === 0 ? (Math.floor(Math.random() * 100) + 1) : +avg();
    const assocScore: number = +score() === 0 ? (Math.floor(Math.random() * 100) + 1) : +score();

    return (

        <div className="aso-card" style={{ marginTop: "10px" }}>
            <Row>
                <Col>
                    <h6>{props.firstName} {props.lastName}</h6>
                </Col>
            </Row>
            <Row>
                <Col md={5} sm={12}>
                    <small>Average: <i>{average}%</i></small>
                    <ProgressBar now={average} striped />
                </Col>
                <Col md={5} sm={12}>
                    <small>Latest Test Score: <i>{assocScore}</i></small>
                    <ProgressBar now={assocScore} striped/>
                </Col>
                <Col md={2} sm={12} style={{ textAlign: "right", marginTop:"15px" }}>
                    <AssociateCardModal {...props} />
                </Col>
            </Row>
        </div>

    );
}
