import React from "react";
import { Col, Container, Row } from "reactstrap";
import { BatchForms } from "../../components/BatchForms/BatchForms";
import { NavBar } from "../../components/NavBar/NavBar";
import { NewClientButton } from "../../components/NewClientButton/NewClientButton";
import Notifications from "../../components/Notifications/Notifications";

/**
 * @function AdminPage
 * Component showing the page that an admin sees when they log in.
 */
export const AdminPage: React.FC = () => {
    return (
        <>
        <Container style={{minHeight: "100vh", maxWidth: "100vw"}}>
            <NavBar route="/admin"/>
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
            <Notifications />

        
        {/* sticky footer */}
        </>
    )
}  
