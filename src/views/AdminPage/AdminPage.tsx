import React from 'react';
import { Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import {NavBar} from '../../components/NavBar/NavBar'


export const AdminPage: React.FC = () => {
    return (
        <>
        <Container style={{height: "100vh", maxWidth: "100vw", backgroundColor:"#B9B9BA"}}>
            <NavBar />
            <Row className="justify-content-between">
                <Col xs="auto">
                </Col>
                <Col xs="4" className="text-left" style={{marginTop:"50px"}}>
                    <Form style={{height: "40vh", maxWidth: "30vw", backgroundColor:"white", borderRadius:"25px", textAlign:"center", color:"#F26925", border:"solid",borderColor:"black",borderWidth:"1px"}}>
                    Map Batch To Client
                        <FormGroup>
                            <br/>
                            <Input type="select">
                                <option>Select Client</option>
                                <option>Client 1</option>
                                <option>Client 2</option>
                            </Input>
                            <br/>
                            <br/>
                            <Input type="select">
                                <option>Select Batch</option>
                                <option>Batch 206</option>
                                <option>Batch 207</option>
                            </Input>
                            <Input type="submit">Submit</Input>
                        </FormGroup>
                    </Form>
                </Col>
                <Col xs="4" className="text-right" style={{marginTop:"50px"}}>
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