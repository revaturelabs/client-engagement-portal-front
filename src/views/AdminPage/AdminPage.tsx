import React from 'react';
import { Col, Container, Form, Input, Row } from 'reactstrap';
import {NavBar} from '../../components/NavBar/NavBar'


export const AdminPage: React.FC = () => {
    return (
        <Container style={{height: "100vh", maxWidth: "100vw", backgroundColor:"#B9B9BA"}}>
            <NavBar />
            <Row className="justify-content-between">
                <Col>
                    <div>
                        <Form>
                            <Input type="select">Select Client
                                <option>Client 1</option>
                                <option>Client 2</option>
                            </Input>
                            <Input type="select">Select Batch
                                <option>Batch 206</option>
                                <option>Batch 207</option>
                            </Input>
                        </Form>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}  