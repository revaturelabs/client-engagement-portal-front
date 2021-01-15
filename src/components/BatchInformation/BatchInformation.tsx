import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import "../../scss/BatchInformation.scss";
import "react-multi-carousel/lib/styles.css";
import { AssociateCardFactory } from '../AssociateCard/AssociateCardFactory';
import PlanInterventionModalv2 from '../PlanInterventionModal/PlanInterventionModalv2';
import { Batch, batchSkillToImage } from '../../views/OmePage/types';
import mockdonutgraph from '../../assets/mock-donut-graph.png';

interface IProps {
    batch: Batch,
}

/**
 * This component displays a buuunch of data about one specific batch.
 *
 * @param props The batch id from the batch card that was selected is
 * passed into this component. This is needed so that the rest of the
 * data about that batch can be retrieved.
 */
export const BatchInformation: React.FC<IProps> = (props: IProps) => {
    const image = batchSkillToImage[props.batch.skill];
    const trainer = 'TODO';

    return (
        <>
            <Row className="justify-content-center">
                <Col md="1" lg="2" />
                <Col md="10" lg="8">
                    <div id="batch-info-wrapper" style={{ marginBottom: "60px" }}>
                        <Card className="batch-info-card">
                            {/* Batch name header */}
                            <CardHeader>
                                <h4>{props.batch.name}</h4>
                            </CardHeader>
                            <CardBody >
                                <Row style={{ textAlign: "center" }}>
                                    <Col> 
                                        <div className="logo-container">
                                            <img src={image} alt="Specialization logo" className='' /><br />
                                        </div>
                                    </Col>
                                    <Col>
                                        <img src={mockdonutgraph} alt="donut graph" style={{ width: "100px" }} /><br />
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: "center" }}>
                                    <Col>
                                        <small id="test-skill">{props.batch.skill}</small>
                                    </Col>
                                    <Col>
                                        <small id="test-skill">Overall Batch Progress</small>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col style={{ textAlign: "center" }}>
                                        <small id="test-train"><b className='readtrainer'>TRAINER:</b> {trainer}</small><br />
                                        <small id="test-end-date"><b className='readted'>TRAINING END DATE:</b> {props.batch.endDate}</small><br />
                                        <small><b>BATCH ENGINEERS:</b> {props.batch.associateAssignments.length}</small>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <PlanInterventionModalv2 />
                            </CardFooter>
                        </Card>

                        {props.batch.associateAssignments !== undefined ?
                            <>
                                {/* Cards which provide detailed info. on the batch associates */}
                                <AssociateCardFactory {...props.batch} />
                            </>
                            :
                            <span id="test-noAss" />
                        }

                    </div>
                </Col>
                <Col md="1" lg="2" />


            </Row>
        </>
    );
}
