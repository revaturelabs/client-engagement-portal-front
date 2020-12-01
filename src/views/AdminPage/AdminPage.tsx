import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { BatchForms } from '../../components/BatchForms/BatchForms';
import { NavBar } from '../../components/NavBar/NavBar';
import { NewClientButton } from '../../components/NewClientButton/NewClientButton';



/**
 * @function AdminPage
 * Component showing the page that an admin sees when they log in.
 */
export const AdminPage: React.FC = () => {
    const [batchFormRerender, setBatchFormRerender] = useState<boolean>(false);

    return (
        <>
            <Container
                style={{
                    minHeight: "100vh",
                    maxWidth: "100vw",
                    backgroundColor: "#E3E3E3",
                }}
            >
                <NavBar />
                <BatchForms rerender={batchFormRerender} doRerender={() => setBatchFormRerender(false)} />

                <Row style={{ marginTop: "20px" }}>
                    <Col xs="2" sm="3" md="4" lg="4" xl="5" />
                    <Col xs="8" sm="6" md="4" lg="4" xl="2">
                        <NewClientButton reloadClientDropdowns={() => setBatchFormRerender(true)} />
                    </Col>
                    <Col xs="2" sm="3" md="4" lg="4" xl="5" />
                </Row>
                {/* <Row>
                    Footer?
                </Row> */}
            </Container>



        {/* sticky footer */}
        </>
    );
};
