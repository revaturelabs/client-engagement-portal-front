import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import '../../scss/BatchFormStyle.scss';

export const BatchForms: React.FC = () => {

    const [mapModal, setMapModal] = useState(false);
    const [unmapModal, setUnmapModal] = useState(false);

    const toggleMap = () => setMapModal(!mapModal);
    const toggleUnmap = () => setUnmapModal(!unmapModal);
    return (
        <>
         <Row className="justify-content-center my-button-row">
                <Col xs="2" sm="3" lg="5" />   
                <Col xs="8" sm="6" lg="2">
                    <button className="batch-form-button" onClick={toggleMap}>Map Batch to Client</button>
                </Col>
                <Col xs="2" sm="3" lg="5" />    
            </Row>
            <Row className="justify-content-center my-button-row">
                <Col xs="2" sm="3" lg="5" />   
                <Col xs="8" sm="6" lg="2">
                    <button className="batch-form-button" onClick={toggleUnmap}>Unmap Client from Batch</button>
                </Col>
                <Col xs="2" sm="3" lg="5" />    
            </Row>
            <Row className="justify-content-between my-form-row">
                <Col sm="1" md="1" lg="2" xl="3"></Col>
                <Col sm="5" md="5" lg="4" xl="3" className="text-left" style={{marginTop:"50px"}}>
                    <Form className="batch-form">
                        <h5>Map Batch To Client</h5>
                        <Input type="select">
                            <option>Select Client</option>
                            <option>Dummy Client 1</option>
                            <option>Dummy Client 2</option>
                        </Input>
                        <br/>
                        <Input type="select">
                            <option>Select Batch</option>
                            <option>Dummy Batch 1</option>
                            <option>Dummy Batch 2</option>
                        </Input>    
                        <input className="batch-form-submit" type="submit" value="Submit" ></input>
                    </Form>
                </Col>
                <Col sm="5" md="5" lg="4" xl="3" className="text-right" style={{marginTop:"50px"}}>
                    <Form className="batch-form">
                        <h5>Unmap Batch From Client</h5>
                        <Input type="select">
                            <option>Select Client</option>
                            <option>Dummy Client 1</option>
                            <option>Dummy Client 2</option>
                        </Input>
                        <br/>
                        <Input type="select">Select Batch
                            <option>Select Batch</option>
                            <option>Dummy Batch 3</option>
                            <option>Dummy Batch 4</option>
                        </Input>

                        <input className="batch-form-submit" type="submit" value="Submit"></input>
                    </Form>
                </Col>
                <Col sm="1" md="1"  lg="2" xl="3"></Col>
            </Row>

          {/* Map Modal */}
         <Modal isOpen={mapModal} toggle={toggleMap} className="batch-form-modal">
            <ModalHeader toggle={toggleMap} className="modal-header">
              Map Batch to Client
            </ModalHeader>
            <ModalBody>
            <Form className="modal-batch-form">
                        <Input type="select">
                            <option>Select Client</option>
                            <option>Dummy Client 1</option>
                            <option>Dummy Client 2</option>
                        </Input>
                        <br/>
                        <Input type="select">
                            <option>Select Batch</option>
                            <option>Dummy Batch 1</option>
                            <option>Dummy Batch 2</option>
                        </Input>    
                        <input className="modal-batch-form-submit" type="submit" value="Submit" ></input>
                    </Form>
            </ModalBody>  
         </Modal>

         {/* UnMap Modal */}
         <Modal isOpen={unmapModal} toggle={toggleUnmap} className="batch-form-modal">
            <ModalHeader toggle={toggleUnmap} className="modal-header">
              Unmap Batch from Client
            </ModalHeader>
            <ModalBody>
            <Form className="modal-batch-form">
                        <Input type="select">
                            <option>Select Client</option>
                            <option>Dummy Client 1</option>
                            <option>Dummy Client 2</option>
                        </Input>
                        <br/>
                        <Input type="select">
                            <option>Select Batch</option>
                            <option>Dummy Batch 1</option>
                            <option>Dummy Batch 2</option>
                        </Input>    
                        <input className="modal-batch-form-submit" type="submit" value="Submit"></input>
                    </Form>
            </ModalBody>  
         </Modal>
        </>

    );
}