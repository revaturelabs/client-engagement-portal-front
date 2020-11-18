import React, { useState } from 'react';
import { Col, Container, DropdownItem, Row } from 'reactstrap';
import { BatchCard } from '../../components/BatchCard/BatchCard';
import { NavBar } from '../../components/NavBar/NavBar';
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaLogo from '../../assets/java-logo.png';
import RequestBatchCard from '../../components/RequestBatchCard/RequestBatchCard'
import RequestBatchCardModal from '../../components/RequestBatchCard/RequestBatchCardModal'
import { getBatchCardData } from '../../actions/BatchCardActions';
import { IBatchState } from '../../_reducers/BatchReducer';
import { connect } from 'react-redux';

interface IProps {
    batches: [],
}

const HomePage:React.FC<IProps> = (props:IProps) => {

    const [hasBatches, setHasBatches] = useState(true);

    const getBatches = () => {
        getBatchCardData(1);
    }

    return(
        <Container style={{height: "100vh", maxWidth: "100vw", backgroundColor:"#B9B9BA"}}>
            <NavBar>
                <DropdownItem header>Development Options</DropdownItem>
                <DropdownItem onClick={() => setHasBatches(false)}>Simulate no batches</DropdownItem>
                <DropdownItem onClick={() => {setHasBatches(true); getBatches;} }>Get Batches from Database</DropdownItem>
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
                        { props.batches }
                    </Container>
                </Col>
                <Col xs="auto">
                    
                </Col>
            </Row>
            :
            <><RequestBatchCard />
            <RequestBatchCardModal /></>
            
            }
        </Container>
    )
}

const mapStateToProps = (store: any) => {
    return {
        batches: store.batchState.batches,
    }
}

export default connect<any>(mapStateToProps)(HomePage);