import React, { useState } from 'react';
import { Col, Container, DropdownItem, Row, Spinner } from 'reactstrap';
import { BatchCard } from '../../components/BatchCard/BatchCard';
import { NavBar } from '../../components/NavBar/NavBar';
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaLogo from '../../assets/java-logo.png';
import RequestBatchCard from '../../components/RequestBatchCard/RequestBatchCard';
import RequestBatchCardModal from '../../components/RequestBatchCard/RequestBatchCardModal';
import { IBatchState } from '../../_reducers/BatchReducer';
import { connect, useDispatch } from 'react-redux';
import Axios from 'axios';
import { setBatchState } from '../../actions/BatchCardActions';

interface IProps {
    batches: {
        id: number,
        skill: string,
        name: string
    }[],
}

const HomePage:React.FC<IProps> = (props:IProps) => {

    const [hasBatches, setHasBatches] = useState(false);
    const [hasSpinner, setSpinner] = useState(false);

    console.log("number of batches: " + props.batches.length);
    console.log("first batch id: " + props.batches[0].id);
    console.log("first batch skill: " + props.batches[0].skill);
    console.log("first batch name: " + props.batches[0].name);
 
    const dispatch = useDispatch();

    const getBatches = () =>
    {   
        dispatch(getBatchCardData(1));
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
        const response:any = await Axios.get("https://caliber2-mock.revaturelabs.com/mock/training/batch")
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
                <DropdownItem onClick={() => setHasBatches(false)}>Simulate no batches</DropdownItem>
                <DropdownItem onClick={() => {setHasBatches(true); getBatches();} }>Get ALL Mock Batches from the Calipur Database</DropdownItem>
            </NavBar>
            
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
                                    <BatchCard batchId={element.id} titlePic={reactReduxLogo} specialization={element.skill}
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