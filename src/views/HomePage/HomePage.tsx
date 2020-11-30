import React, { useState } from 'react';
import { Col, Container, DropdownItem, Row, Spinner } from 'reactstrap';
import { BatchCard } from '../../components/BatchCard/BatchCard';
import { NavBar } from '../../components/NavBar/NavBar';

import RequestBatchCard from '../../components/RequestBatchCard/RequestBatchCard';
import RequestBatchCardModal from '../../components/RequestBatchCard/RequestBatchCardModal';
import { IBatchDetailedState, IBatchState, initialBatchState } from '../../_reducers/BatchReducer';
import { connect, useDispatch } from 'react-redux';
import Axios from 'axios';
import { setBatchDetailsState, setBatchState } from '../../actions/BatchCardActions';
import PlanInterventionModal from '../../components/PlanInterventionModal/PlanInterventionModal';
import { Auth } from 'aws-amplify';
import { axiosInstance } from '../../util/axiosConfig';

interface IProps {
    batches: {
        batchId: string,
        skill: string,
        name: string
    }[],
}

/**
 * Will show the batches that were mapped to the logged in client. Unless they were not mapped any
 * batches. In that case, they will be shown a message which assures them that they will be mapped
 * one in the near future and can even notify the admin users with the "request batch" button. 
 * 
 * @param props Basic batch information. Should be pulled from the database whenever this component loads 
 */
const HomePage: React.FC<IProps> = (props: IProps) => {

    const [hasBatches, setHasBatches] = useState(false);
    const [hasData, setRecievedData] = useState(false);
    const [hasSpinner, setSpinner] = useState(false);

    const dispatch = useDispatch();

    /**
     * @function getBatches
     * DEVELOPER function used to retrieve mock data for display
     */
    const getBatches = (userEmail:string) =>
    {
        //gets batch data from caliber
        dispatch(getBatchCardData(userEmail));
    }

    /**
     * @function getBatches
     * DEVELOPER function used to simulate having zero batches
     */
    const resetBatches = () => {
        setHasBatches(false);

        //removes batches' data / resets the batch state
        dispatch(setBatchState(initialBatchState));
    }

    /**
     * @function getBatches
     * DEVELOPER function used to simulate having 3 batches
     */
    const getSimulatedBatches = () => {
        setHasBatches(true);

        //displays simulated batch data
        setSpinner(true);

        const fakeBatchArray:IBatchState = {
            batches: [
                { id: 1, skill: "Java React", name: "The Batchelors" },
                { id: 2, skill: "SalesForce", name: "Ala-batch-ter" },
                { id: 3, skill: ".NET/Microservices", name: "Some of a Batch" },
            ]
        };

        dispatch(setBatchState(fakeBatchArray));

        setSpinner(false);
    }

    /** array to place batch data into */
    const batchArray:IBatchState = {
        batches: [],
    };

    /**
     * This function gets all of the batch data currently in the Caliber
     *  db. It places all of the data from that endpoint into the "batch
     *  state".
     *
     * @param userId The passed in user id (currently does nothing)
     * 
     * @returns This function just changes the batch state to contain
     * each currently avaiable batch in the db.
     */
    const getBatchCardData = (userEmail:string) => async () => {

        setSpinner(true);

        //get data from server based on user id that was given

        await axiosInstance().then((result) => {
            result.get("/client/batch/email/" + userEmail)
            .then((response:any) => {

            if (response != null)
            {
                //individual batch info is placed into the array from above
                for (let batchData of response.data)
                {
                    const batchCardInfo = {  ...batchData };
                    batchArray.batches.push(batchCardInfo);
                }

                //if there were no batches found, then don't show any batch card data
                if (batchArray.batches.length != 0)
                {
                    setHasBatches(true);
                    
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
        })

    };

    /** gets the user's email */
    const getEmail = async () => {

        setSpinner(true);

        const checkRole = Auth.currentUserInfo();

        const checker = await checkRole.then((result) => {
            
            //if there is no AWS cognito token information at all, then redirect to the login page
            if(result != null)
            {
                //if the AWS congito token contains an email value, check for batches associated
                // with that email address
                if(result.attributes["email"] != null)
                {
                    getBatches(result.attributes["email"]);
                }
                else
                {
                    setSpinner(false);
                }
            }
            else
            {
                window.location.href="/";  //redirects to login page
            }

        })
            
    }

    //should run on page load only once
    if(hasData == false)
    {
        setRecievedData(true);  //prevents an infinite loop
        getEmail();
    }

    return (
        <Container style={{ minHeight: "100vh", maxWidth: "100vw" }}>
            <NavBar route="/home">
                <DropdownItem header>Development Options</DropdownItem>
                <DropdownItem onClick={() => resetBatches()}>Simulate no batches</DropdownItem>
                <DropdownItem onClick={() => getSimulatedBatches()}>Simulate 3 batches</DropdownItem>
            </NavBar>

            {/* Modal for Requesting an Intervention, will be moved to batch info page */}
            {hasBatches ?

            <Row className="justify-content-between">
                <Col md="auto">
                </Col>
                <Col md="8" className="text-left" style={{marginTop:"50px"}}>
                    
                    <h1>Your Batches:</h1>
                    <hr style={{borderTop:"2px solid #474C55"}} />
                    <Container>
                        {/* displays spinner while loading */}
                        { hasSpinner ? 
                        <div className="row justify-content-center">
                            <Spinner  color="info" style={{ margin: 20 }}/>
                        </div> 
                        :
                        <Row>
                        {
                            /* displays all of the batch cards that are mapped to the client */
                            props.batches.map((element,index) => (
                                <Col xl="3" lg="4" md="5" sm="6" xs="6" key={index}>
                                    <BatchCard batchId={element.batchId} specialization={element.skill}
                                    batchName={element.name} />
                                </Col>

                            ))
                        }
                        </Row>
                    }
                    </Container>
                </Col>
                <Col md="auto">
                    
                </Col>
            </Row>
            :
            <>
                {/* displays spinner while loading */}
                {
                hasSpinner ?
                <div className="row justify-content-center">
                    <Spinner  color="info" style={{ margin: 20 }}/>
                </div>  
                :
                <RequestBatchCard /> 
                }
                
            </>
            
            }
        </Container>
    )
}

const mapStateToProps = (store: any) => {
    return {
        batches: store.batchState.batches,
    }
}

export default connect<IProps>(mapStateToProps)(HomePage);
