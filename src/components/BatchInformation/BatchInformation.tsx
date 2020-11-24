import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Spinner } from 'reactstrap';
import "../../scss/BatchInformation.scss"
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaLogo from '../../assets/java-logo.png';
import javaAuto from '../../assets/JavaAutoLogo.png';
import pegaLogo from '../../assets/Pegalogo.jpg';
import salesLogo from '../../assets/sales.png';
import bigData from '../../assets/bigData.png';
import netLogo from '../../assets/NET.jpg';
import devOpsLogo from '../../assets/devOps.jpg';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AssociateCardFactory } from '../AssociateCard/AssociateCardFactory';
import PlanInterventionModalv2 from '../PlanInterventionModal/PlanInterventionModalv2';


interface IProps{
    batches: [{
        batchId: string,
        batchName: string,
        endDate: string,
        skill: string,
        trainer: string,
        associateAssignments: [{}],
    }],
}

/**
 * This component displays a buuunch of data about one specific batch.
 * 
 * @param props The batch id from the batch card that was selected is
 * passed into this component. This is needed so that the rest of the 
 * data about that batch can be retrieved.
 */
export const BatchInformation:React.FC<IProps> = (props:IProps) => {

    const [showInterventionModal, setShowInterventionModal] = useState(false);
    const [isOrangeBtn, setOrangeBtn] = useState(false);

    console.log(props.batches[0]);

    let image = "";      //sets the image of this card to match the specialization
    if (props.batches[0].skill === "Java/Microservices")
    {
        image = javaLogo;
    }
    else if (props.batches[0].skill === "PEGA")
    {
        image = pegaLogo;
    }
    else if (props.batches[0].skill === "Java with Automation")
    {
        image = javaAuto;
    }
    else if (props.batches[0].skill === "Java React")
    {
        image = reactReduxLogo;
    }
    else if (props.batches[0].skill === "Big Data")
    {
        image = bigData;
    }
    else if (props.batches[0].skill === "SalesForce")
    {
        image = salesLogo;
    }
    else if (props.batches[0].skill === ".NET/Microservices")
    {
        image = netLogo;
    }
    else if (props.batches[0].skill === "Java Devops")
    {
        image = devOpsLogo;
    }

    return(
        <>
         <Row className="justify-content-center">
             <Col md="1" lg="2"></Col>
             <Col md="10" lg="8">
                <div id="batch-info-wrapper">
                    <Card className="batch-info-card">
                        <CardHeader>
                            <h4>{props.batches[0].batchName}</h4>
                        </CardHeader>
                        <CardBody>
                            <h5><b>Core Technology Learned:</b></h5>
                            <Row>
                                <Col className="logo-container">
                                <span className="helper"></span>
                                    <img src={image} alt="Specialization logo" />
                                </Col>
                            </Row>
                            <Row style={{textAlign: "center"}}>
                                <Col><p>{props.batches[0].skill}</p></Col>
                            </Row>
                            <p><b>Trainer:</b> {props.batches[0].trainer}</p>
                            <p><b>Training End Date:</b> {props.batches[0].endDate}</p>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                    
                    <h1>Batch Engineers: ({props.batches[0].associateAssignments.length})</h1>
                        <AssociateCardFactory {...props.batches[0]}/>

                </div>
             </Col>
             <Col md="1" lg="2"></Col>

             <PlanInterventionModalv2 />

         </Row>
        </>
    );
}