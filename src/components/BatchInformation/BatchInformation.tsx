import React, { useState } from 'react';
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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bArrow from "../../assets/whiteBarrow.svg";
import oArrow from "../../assets/orangeBarrow.svg";
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { IBatchState } from '../../_reducers/BatchReducer';
import { axiosInstance } from '../../util/axiosConfig';
import { setBatchState } from '../../actions/BatchCardActions';
import { connect } from 'react-redux';
import { IBasicBatchInfo } from '../BatchCard/BatchCard';
import { AssociateCardFactory } from '../AssociateCard/AssociateCardFactory';
import PlanInterventionModalv2 from '../PlanInterventionModal/PlanInterventionModalv2';


interface IProps {
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
 * @function BatchInformation
 * Displays detailed batch information in its own page.
 *
 * @param props contains the detailed batch data needed to populate the page.
 */
export const BatchInformation: React.FC<IProps> = (props: IProps) => {

    const [showInterventionModal, setShowInterventionModal] = useState(false);
    const [isOrangeBtn, setOrangeBtn] = useState(false);

    console.log(props.batches[0]);

    let image = "";      //sets the image of this card to match the specialization
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

    const responsive = {     //for responsive styling on the carousel cards below
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1200 },
            items: 5,
            slidesToSlide: 5
        },
        desktop: {
            breakpoint: { max: 1200, min: 992 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 992, min: 576 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    const goBack = () => {
        window.location.href = "/home";
    }


    return (
        <>
            {/* Back button
        <span>
            <button className="back-btn" onClick={goBack} onMouseOver={() => {setOrangeBtn(true)}}
            onMouseOut={() => {setOrangeBtn(false)}}>
                { isOrangeBtn ? <span><img src={oArrow} alt="back arrow" /></span> : 
                <span><img src={bArrow} alt="back arrow" /></span>}
                <span>Back</span>
            </button>
        </span>
        */}
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
                                <Row style={{ textAlign: "center" }}>
                                    <Col><p>{props.batches[0].skill}</p></Col>
                                </Row>
                                <p><b>Trainer:</b> {props.batches[0].trainer}</p>
                                <p><b>Training End Date:</b> {props.batches[0].endDate}</p>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>

                        <h1>Batch Engineers: ({props.batches[0].associateAssignments.length})</h1>
                        <AssociateCardFactory {...props.batches[0]} />

                    </div>
                </Col>
                <Col md="1" lg="2"></Col>

                <PlanInterventionModalv2 />

            </Row>
        </>
    );
}