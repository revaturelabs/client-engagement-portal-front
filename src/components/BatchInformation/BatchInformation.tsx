import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Spinner } from 'reactstrap';
import "../../scss/BatchInformation.scss"
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaLogo from '../../assets/java-logo.png';
import springLogo from '../../assets/spring-logo.png';
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

interface IProps{
    batches: [{}],
}

/**
 * This component displays a buuunch of data about one specific batch.
 * 
 * @param props The batch id from the batch card that was selected is
 * passed into this component. This is needed so that the rest of the 
 * data about that batch can be retrieved.
 */
export const BatchInformation:React.FC<IProps> = (props:IProps) => {

    const [isOrangeBtn, setOrangeBtn] = useState(false);
    const [hasSpinner, setSpinner] = useState(false);

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

      const viewBatchId = () => {
        console.log("this should show the passed in batch id: " + props);
      }

    /**
     * This function gets all of the batch data from our back end. This
     * includes data about each associate's test / quiz scores.
     * 
     * @param batchId the batch id passed in from the batch card on the
     * home page
     * 
     * @returns This function just changes the batch state to 
     */
    const getBatchData = (batchId:string) => async (dispatch:any) => {

        setSpinner(true);

        //array to place batch data into
        let batchArray:IBatchState = {
            batches: [],
        };

        //get data from server based on user id that was given
        await axiosInstance.get("")
        .then((response:any) => {
    
            if (response != null)
            {
                //individual batch info is placed into the array from above
                for (let i = 0 ; i < response.data.length; i++)
                {
                    let batchCardInfo = {  ...response.data[i] }
                    batchArray.batches.push(batchCardInfo);
                }
                
                //the "batch state" is set to be whatever was extracted from the db
                dispatch(setBatchState(batchArray));
                
            }
            setSpinner(false);
        })
        .catch((error:any) => {
            console.log(error);
            setSpinner(false);
        });

        setSpinner(false);
        
    };
    return(
        <>
        {/* Back button */}
        <span>
            <button className="back-btn" onClick={goBack} onMouseOver={() => {setOrangeBtn(true)}}
            onMouseOut={() => {setOrangeBtn(false)}}>
                { isOrangeBtn ? <span><img src={oArrow} alt="back arrow" /></span> : 
                <span><img src={bArrow} alt="back arrow" /></span>}
                <span>Back</span>
            </button>
        </span>
         <Row className="justify-content-center">
             <Col md="1" lg="2"></Col>
             <Col md="10" lg="8">
                <div id="batch-info-wrapper">
                    <Card className="batch-info-card">
                        <CardHeader>
                            <h4>2009 Sep 28 Batch</h4>
                        </CardHeader>
                        <CardBody>
                            <h5>Core Technologies  Learned:</h5>
                            <Row>
                                <Col xs="4" className="logo-container">
                                <span className="helper"></span>
                                    <img src={reactReduxLogo} alt="react redux logo" />

                                </Col>
                                <Col xs="4" className="logo-container">
                                <span className="helper"></span>
                                    <img src={javaLogo} alt="java logo" />

                                </Col>
                                <Col xs="4" className="logo-container">
                                    <span className="helper"></span>
                                    <img src={springLogo} alt="spring logo" />

                                </Col>
                            </Row>
                            <Row style={{textAlign: "center"}}>
                                <Col xs="4"><p>React Redux</p></Col>
                                <Col xs="4"><p>Java 8</p></Col>
                                <Col xs="4"><p>Spring MVC & ORM</p></Col>
                            </Row>
                            <p><b>Trainer:</b> Robert Connel</p>
                            <p><b>Training End Date:</b> 12/04/20</p>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                    {/* Spinner displays below the main batch card */}
                    <Row>
                        <div className="justify-content-center">
                            {hasSpinner ? <Spinner color="info" /> : <span/>}
                        </div>
                    </Row>
                    
                    <h1>Batch Engineers</h1>

                    <Carousel responsive={responsive}>
                        <Card>
                            <CardHeader>
                                Alex Orr
                            </CardHeader>
                            <CardBody>
                                100%
                            </CardBody>
                            <CardFooter>
                                <button onClick={viewBatchId}>View</button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                Earnest Gibbs
                            </CardHeader>
                            <CardBody>
                                92%
                            </CardBody>
                            <CardFooter>
                                <button>View</button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                Jordan Hunnicutt
                            </CardHeader>
                            <CardBody>
                                95%
                            </CardBody>
                            <CardFooter>
                                <button>View</button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                Nicolas Henandez
                            </CardHeader>
                            <CardBody>
                                93%
                            </CardBody>
                            <CardFooter>
                                <button>View</button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                Kyle Aoki
                            </CardHeader>
                            <CardBody>
                                98%
                            </CardBody>
                            <CardFooter>
                                <button>View</button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                John Burlison
                            </CardHeader>
                            <CardBody>
                                99%
                            </CardBody>
                            <CardFooter>
                                <button>View</button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                Dawit Wondim
                            </CardHeader>
                            <CardBody>
                                97%
                            </CardBody>
                            <CardFooter>
                                <button>View</button>
                            </CardFooter>
                        </Card>
                    </Carousel>

                </div>
             </Col>
             <Col md="1" lg="2"></Col>
         </Row>
        </>
    );
}