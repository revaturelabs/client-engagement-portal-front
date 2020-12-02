import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import "../../scss/BatchInformation.scss"
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaLogo from '../../assets/java-logo.png';
import javaAuto from '../../assets/JavaAutoLogo.png';
import pegaLogo from '../../assets/Pegalogo.jpg';
import salesLogo from '../../assets/sales.png';
import bigData from '../../assets/bigData.png';
import netLogo from '../../assets/NET.jpg';
import devOpsLogo from '../../assets/devOps.jpg';
import "react-multi-carousel/lib/styles.css";
import { AssociateCardFactory } from '../AssociateCard/AssociateCardFactory';
import PlanInterventionModalv2 from '../PlanInterventionModal/PlanInterventionModalv2';


interface IProps {
    batches: [{
        batchId: string,
        batchName: string,
        endDate: string,
        skill: string,
        trainer: string,
        associateAssignments?: {}[],
    }],
}

/**
 * This component displays a buuunch of data about one specific batch.
 *
 * @param props The batch id from the batch card that was selected is
 * passed into this component. This is needed so that the rest of the
 * data about that batch can be retrieved.
 */
export const BatchInformation: React.FC<IProps> = (props: IProps) => {

    let image = "";      //sets the image of this component to match the specialization
    if (props.batches[0].skill === "Java/Microservices") {
        image = javaLogo;
    }
    else if (props.batches[0].skill === "PEGA") {
        image = pegaLogo;
    }
    else if (props.batches[0].skill === "Java with Automation") {
        image = javaAuto;
    }
    else if (props.batches[0].skill === "Java React") {
        image = reactReduxLogo;
    }
    else if (props.batches[0].skill === "Big Data") {
        image = bigData;
    }
    else if (props.batches[0].skill === "SalesForce") {
        image = salesLogo;
    }
    else if (props.batches[0].skill === ".NET/Microservices") {
        image = netLogo;
    }
    else if (props.batches[0].skill === "Java Devops") {
        image = devOpsLogo;
    }

    return(
        <>
         <Row className="justify-content-center">
             <Col md="1" lg="2"></Col>
             <Col md="10" lg="8">
                <div id="batch-info-wrapper">
                    <Card className="batch-info-card">
                        {/* Batch name header */}
                        <CardHeader>
                            <h4>{props.batches[0].batchName}</h4>
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
                                <Col><p id="test-skill">{props.batches[0].skill}</p></Col>
                            </Row>
                            {/* Trainer and end date text */}
                            <p id="test-train"><b className ='readtrainer'>Trainer:</b> {props.batches[0].trainer}</p>
                            <p id="test-end-date"><b className = 'readted'>Training End Date:</b> {props.batches[0].endDate}</p>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                    { props.batches[0].associateAssignments !== undefined ?
                    <>
                        {/* Cards which provide detailed info. on the batch associates */}
                        <h1>Batch Engineers: ({props.batches[0].associateAssignments.length})</h1>
                        <AssociateCardFactory {...props.batches[0]}/>
                    </>
                        :
                        <span id="test-noAss"/>
                    }


                    </div>
                </Col>
                <Col md="1" lg="2"></Col>

                <PlanInterventionModalv2 />
            </Row>
        </>
    );
}
