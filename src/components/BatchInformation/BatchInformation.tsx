import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import "../../scss/BatchInformation.scss";
import "react-multi-carousel/lib/styles.css";
import { AssociateCardFactory } from '../AssociateCard/AssociateCardFactory';
import PlanInterventionModalv2 from '../PlanInterventionModal/PlanInterventionModalv2';
import { Batch, batchSkillToImage } from '../../views/OmePage/types';


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

    return(
        <>
         <Row className="justify-content-center">
             <Col md="1" lg="2"/>
             <Col md="10" lg="8">
                <div id="batch-info-wrapper">
                    <Card className="batch-info-card">
                        {/* Batch name header */}
                        <CardHeader>
                            <h4>{props.batch.name}</h4>
                        </CardHeader>
                        <CardBody>
                            {/* Core tech. label and image */}
                            <h5><b className = 'readctl'>Core Technology Learned:</b></h5>
                            <Row>
                                <Col className="logo-container">
                                <span className="helper"/>
                                    <img src={image} alt="Specialization logo" className='speclogo' />
                                </Col>
                            </Row>
                            {/* Specialization text underneeth image */}
                            <Row style={{textAlign: "center"}}>
                                <Col><p id="test-skill">{props.batch.skill}</p></Col>
                            </Row>
                            {/* Trainer and end date text */}
                            <p id="test-train"><b className ='readtrainer'>Trainer:</b> {trainer}</p>
                            <p id="test-end-date"><b className = 'readted'>Training End Date:</b> {props.batch.endDate}</p>
                        </CardBody>
                        <CardFooter/>
                    </Card>
                    { props.batch.associateAssignments !== undefined ?
                    <>
                        {/* Cards which provide detailed info. on the batch associates */}
                        <h1>Batch Engineers: ({props.batch.associateAssignments.length})</h1>
                        <AssociateCardFactory {...props.batch}/>
                    </>
                        :
                        <span id="test-noAss"/>
                    }


                    </div>
                </Col>
                <Col md="1" lg="2"/>

                <PlanInterventionModalv2 />
            </Row>
        </>
    );
}
