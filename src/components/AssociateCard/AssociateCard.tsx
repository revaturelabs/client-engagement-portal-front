import React from 'react';
import { AssociateCardModal } from './AssociateCardModal';
import { Col, Row } from 'reactstrap';
import { ProgressBar } from 'react-bootstrap'
import { AssociateAssignment } from '../../types';
import '../../scss/associate-card.scss';

interface IAssociateCardProps {
    associateAssignment: AssociateAssignment;
}

export const AssociateCard: React.FC<IAssociateCardProps> = (props) => {
    const associate = props.associateAssignment.associate;
    
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
        if (associate.grades !== undefined) {
            for (const test of associate.grades) {
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
        let size = associate.grades.length;
        let gId = 0;

        while (i < size) {
            /**
            * For each item in test scores, if the gradeId is greater than the held one, change the value to match.
            * When it stops iterating, we'll have the last value.
            */
            if (associate.grades[i].gradeId > gId) {
                value = associate.grades[i].score;
                gId = associate.grades[i].gradeId;
            }
            i++;
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
                    <h6>{associate.firstName} {associate.lastName}</h6>
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
                    <AssociateCardModal associateAssignment={props.associateAssignment} />
                </Col>
            </Row>
        </div>

    );
}
