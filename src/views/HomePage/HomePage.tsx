import React, { useState } from 'react';
import { Col, Container, DropdownItem, Row, Spinner } from 'reactstrap';
import { BatchCard } from '../../components/BatchCard/BatchCard';
import { NavBar } from '../../components/NavBar/NavBar';

import RequestBatchCard from '../../components/RequestBatchCard/RequestBatchCard';
import RequestBatchCardModal from '../../components/RequestBatchCard/RequestBatchCardModal';
import { IBatchState, initialBatchState } from '../../_reducers/BatchReducer';
import { connect, useDispatch } from 'react-redux';
import Axios from 'axios';
import { setBatchState } from '../../actions/BatchCardActions';
import PlanInterventionModal from '../../components/PlanInterventionModal/PlanInterventionModal';

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
const HomePage:React.FC<IProps> = (props:IProps) => {

    const [showInterventionModal, setShowInterventionModal] = useState(false);
    const [hasBatches, setHasBatches] = useState(false);
    const [hasSpinner, setSpinner] = useState(false);
 
    const dispatch = useDispatch();

    // temporary DEVELOPMENT functions which are called from the nav bar
    const getBatches = () =>
    {   
        setHasBatches(true);

        //gets batch data from caliber
        dispatch(getBatchCardData(1));
    }

    const resetBatches = () =>
    {   
        setHasBatches(false);

        //removes batches' data / resets the batch state
        dispatch(setBatchState(initialBatchState));
    }

    const getSimulatedBatches = () =>
    {
        setHasBatches(true);

        //displays simulated batch data
        setSpinner(true);

        const batchArray:IBatchState = {
            batches: [
                {id: 1, skill: "Java React", name: "The Batchelors"},
                {id: 2, skill: "SalesForce", name: "Ala-batch-ter"},
                {id: 3, skill: ".NET/Microservices", name: "Some of a Batch"},
            ]
        };

        dispatch(setBatchState(batchArray));

        setSpinner(false);
    }

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
    const getBatchCardData = (userId:number) => async (dispatch:any) => {

        setSpinner(true);

        //array to place batch data into
        let batchArray:IBatchState = {
            batches: [],
        };

        //get data from server based on user id that was given
        await Axios.get("https://caliber2-mock.revaturelabs.com/mock/training/batch/current")
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
        <Container style={{minHeight: "100vh", maxWidth: "100vw", backgroundColor:"#E3E3E3"}}>
            <NavBar>
                <DropdownItem header>Development Options</DropdownItem>
                <DropdownItem onClick={() => resetBatches()}>Simulate no batches</DropdownItem>
                <DropdownItem onClick={() => getSimulatedBatches()}>Simulate 3 batches</DropdownItem>
                <DropdownItem onClick={() => getBatches()}>Get ALL Mock Batches from Caliber (Requires CORS Extension)</DropdownItem>
            </NavBar>

            {/* Modal for Requesting an Intervention, will be moved to batch info page */}
            <button onClick={() => setShowInterventionModal(!showInterventionModal)}>Temporary Test Intervention Modal (Will Go on Batch Info Page)</button>
            <PlanInterventionModal show={showInterventionModal} setShow={setShowInterventionModal} />
            
            {hasBatches ?

            <Row className="justify-content-between">
                <Col xs="auto">
                </Col>
                <Col xs="8" className="text-left" style={{marginTop:"50px"}}>
                    
                    <h1>Your Batches:</h1>
                    <hr style={{borderTop:"2px solid #474C55"}} />
                    <p style={{color: "#474C55", fontSize:"1.2em"}}>Click to find out more...</p>
                    <br />
                    <Container>
                        {/* displays spinner while loading */}
                        { hasSpinner ? <div className="row justify-content-center"><Spinner  color="info" /></div> : <span/> }
                        <Row>
                        { 
                            props.batches.map((element,index) => (
                                <Col xl="2" lg="3" md="4" sm="4" xs="6" key={index}>
                                    <BatchCard batchId={element.batchId} specialization={element.skill}
                                    batchName={element.name} />
                                </Col>
                                
                            ))
                        }
                        </Row>
                    </Container>
                </Col>
                <Col xs="auto">
                    
                </Col>
            </Row>
            :
            <>
                {/* displays spinner while loading */}
                { hasSpinner ? <Spinner  color="info" /> : <span/> }
                <RequestBatchCard />
                <RequestBatchCardModal />
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