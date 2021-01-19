import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import "../../scss/BatchInformation.scss"
import "react-multi-carousel/lib/styles.css";
import { AssociateCardFactory } from '../AssociateCard/AssociateCardFactory';
import PlanInterventionModalv2 from '../PlanInterventionModal/PlanInterventionModalv2';
import { Batch, batchSkillToImage } from '../../types';
import GradeHistoryLineGraph from '../Graphs/GradeHistoryLineGraph';
import PercentageCircle from '../Graphs/PercentageCircle';
import BatchAverageGraph from '../Graphs/BatchAverageGraph';

/**
 * This component displays data about one specific batch.
 */
export const BatchInformation : React.FC<{batch:Batch}> = ({ batch }) => {
    const [image] = useState<string>(batchSkillToImage[batch.skill]); // Sets the image of this component to match the specialization

    return(
        <Row className="justify-content-center">
            <Col md="1" lg="2" />
            <Col md="10" lg="8">
              <GradeHistoryLineGraph batch={batch} traineeId="SF-6304" />
              <BatchAverageGraph batch={batch} />
              <PercentageCircle batch={batch} />
                <div id="batch-info-wrapper">
                    <Card className="batch-info-card">
                        {/* Batch name header */}
                        <CardHeader>
                            <h4>{batch.name}</h4>
                        </CardHeader>
                        <CardBody>
                            {/* Core tech. label and image */}
                            <h5><b className = 'readctl'>Core Technology Learned:</b></h5>
                            <Row>
                                <Col className="logo-container">
                                <span className="helper"></span>
                                    <img src={image} alt="Specialization logo" className='speclogo' />
                                </Col>
                            </Row>
                            {/* Specialization text underneeth image */}
                            <Row style={{textAlign: "center"}}>
                                <Col><p id="test-skill">{batch.skill}</p></Col>
                            </Row>
                            {/* Trainer and end date text */}
                            <p id="test-train"><b className ='readtrainer'>Trainer:</b> {batch.trainer}</p>
                            <p id="test-end-date"><b className = 'readted'>Training End Date:</b> {batch.endDate}</p>
                        </CardBody>
                        <CardFooter />
                    </Card>
                    {batch.associateAssignments?.length
                        ? <>
                            {/* Cards which provide detailed info. on the batch associates */}
                            <h1>Batch Engineers: ({batch.associateAssignments.length})</h1>
                            <AssociateCardFactory {...Object.entries(batch).reduce((a, [k,v]) => ['employeeAssignments'].includes(k) ? a : ({...a, [k]: v }), {})} />
                        </>
                        : <span id="test-noAss"/>
                    }
                </div>
            </Col>
            <Col md="1" lg="2" />
            <PlanInterventionModalv2 />
        </Row>
    );
}
