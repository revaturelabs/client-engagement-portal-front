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
        id: number,
        skill: string,
        name: string
    }[],
}

/**
 * Will show the batches that were mapped to the logged in client. Unless they were not mapped any
 * batches. In that case, they will be shown a message which assures them that they will be mapped
 * one in the near future and can even notify the admin users with the "request batch" button. 
 * 
 * @param props batch information. Should be pulled from the database whenever this component loads 
 */
const HomePage:React.FC<IProps> = (props:IProps) => {

    const [hasBatches, setHasBatches] = useState(false);
    const [hasSpinner, setSpinner] = useState(false);
 
    const dispatch = useDispatch();

    //temporary functions which are called from the nav bar
    const getBatches = () =>
    {   
        //gets batch data from calipur
        dispatch(getBatchCardData(1));
    }

    const resetBatches = () =>
    {   
        //removes calipur data / resets the batch state
        dispatch(setBatchState(initialBatchState));
    }

    /**
     * This function gets all of the batch data currently in the Calipur
     *  db. It places all of the data from that endpoint into the "batch
     *  state".
     * 
     * @param userId The passed in user id (currently does nothing)
     * 
     * @returns This function just changes the batch state to 
     */
    const getBatchCardData = (userId:number) => async (dispatch:any) => {

        setSpinner(true);

        //array to place batch data into
        let batchArray:any = {
            batches: [],
        };

        //get data from server based on user id that was given
        const response:any = await Axios.get("https://caliber2-mock.revaturelabs.com/mock/training/batch/current")
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
        <Container style={{height: "100%", maxWidth: "100%", backgroundColor:"#e3e3e3"}}>
            <NavBar>
                <DropdownItem header>Development Options</DropdownItem>
                <DropdownItem onClick={() => {setHasBatches(false); resetBatches();}}>Simulate no batches</DropdownItem>
                <DropdownItem onClick={() => {setHasBatches(true); getBatches();} }>Get ALL Mock Batches from the Calipur Database</DropdownItem>
            </NavBar>

            {/* I only commented this out because I couldn't add all the modules in my version for some reason
            
            Modal for Requesting an Intervention, will be moved to batch info page
            <button onClick={() => setShowInterventionModal(!showInterventionModal)}>Temporary Test Intervention Modal (Will Go on Batch Info Page)</button>
            <PlanInterventionModal show={showInterventionModal} setShow={setShowInterventionModal} />
              Modal for Requesting an Intervention, will be moved to batch info page */}
            
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
                                <span key={index} className="col-3" >
                                    <BatchCard batchId={element.id} specialization={element.skill}
                                    batchName={element.name} />
                                </span>
                                
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