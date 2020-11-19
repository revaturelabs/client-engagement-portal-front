import React from "react";
import { Col, Container, Form, Input, Row } from "reactstrap";
import { BatchForms } from "../../components/BatchForms/BatchForms";
import { NavBar } from "../../components/NavBar/NavBar";
import { NewClientButton } from "../../components/NewClientButton/NewClientButton";

export const AdminPage: React.FC = () => {
    return (
        <>
        <Container style={{minHeight: "100vh", maxWidth: "100vw", backgroundColor:"#E3E3E3"}}>
            <NavBar />
            <BatchForms/>
            
            <Row style={{ marginTop: "20px" }}>
                <Col xs="2" sm="3" md="4" lg="4" xl="5"/>
                <Col xs="8" sm="6" md="4" lg="4" xl="2">
                    <NewClientButton />
                </Col>
                <Col xs="2" sm="3" md="4" lg="4" xl="5"/>
            </Row>

            {/* <Row>
                Footer?
            </Row> */}
        </Container>
        
        {/* sticky footer */}
        </>
    )
}  
