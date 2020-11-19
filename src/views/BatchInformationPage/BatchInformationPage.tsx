import React from 'react';
import { Container } from 'reactstrap';
import { BatchInformation } from '../../components/BatchInformation/BatchInformation';
import { NavBar } from '../../components/NavBar/NavBar';



export const BatchInformationPage: React.FC = () => {
    return (
        <>
            <Container style={{minHeight: "100vh", maxWidth: "100vw", backgroundColor:"#E3E3E3"}}>
                <NavBar />
                <BatchInformation name="TEST"/>
            </Container>
        </>
    );
}