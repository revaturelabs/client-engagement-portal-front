import React from 'react';
import { Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import {NavBar} from '../../components/NavBar/NavBar'
import './BatchFormStyle.scss';


export const AdminPage: React.FC = () => {
    return (
        <>
        <Container style={{height: "100vh", maxWidth: "100vw", backgroundColor:"#B9B9BA"}}>
            <NavBar />
            <Row className="justify-content-between">
                <Col xs="auto">
                </Col>
                <Col xs="3" className="text-left" style={{marginTop:"50px"}}>
                    <Form className="BatchForm">
                    Map Batch To Client
                        <FormGroup>
                            <Input type="select">
                                <option>Select Client</option>
                                <option>Client 1</option>
                                <option>Client 2</option>
                            </Input>
                            <br/>
                            <Input type="select">
                                <option>Select Batch</option>
                                <option>Batch 206</option>
                                <option>Batch 207</option>
                            </Input>
                            
                            <Input type="submit" className="BatchFormSubmit">Submit</Input>
                        </FormGroup>
                    </Form>
                </Col>
                <Col xs="3" className="text-right" style={{marginTop:"50px"}}>
                    <Form className="BatchForm">
                        Unmap Batch From Client
                        <Input type="select">Select Client
                            <option>Client 1</option>
                            <option>Client 2</option>
                        </Input>
                        <Input type="select">Select Batch
                            <option>Batch 206</option>
                            <option>Batch 207</option>
                        </Input>
                    </Form>
                </Col>
                <Col xs="auto">
                </Col>
            </Row>
            {/* <Row>
                Footer?
            </Row> */}
        </Container>
        
        {/* sticky footer */}
        </>
    )
}  