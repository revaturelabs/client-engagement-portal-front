import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Form, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import '../../scss/BatchFormStyle.scss';

/**
 * @function BatchForms
 * Renders the Map and Unmap forms on the page.
 */
export const BatchForms: React.FC = () => {

    const [mapModal, setMapModal] = useState(false);
    const [unmapModal, setUnmapModal] = useState(false);

    /**
     * @function toggleMap
     * toggles the mobile map batch modal 
     */
    const toggleMap = () => setMapModal(!mapModal);
    /**
     * @function toggleUnmap
     * toggle the mobile unmap batch form
     */
    const toggleUnmap = () => setUnmapModal(!unmapModal);

    const [batchInfo, setBatchInfo] = useState<any>([]);

    /**
     * @function getBatches
     * loops though batch objects to extract and assign appropriate data
     * @async
     * Creates an axios get call to gather batch information
     *
     */
    const getBatches = async () => {
        const response = await axios.get("https://caliber2-mock.revaturelabs.com/mock/training/batch/current");
        const tempArray=[];
        for (const r of response.data)
        {
          const id = r.id;
          const name = r.name;
          tempArray.push({id,name});
      }
  
      /**
       * @function setBatchInfo
       * spreading the tempArray and assigning all values to the batchInfo
       */
      setBatchInfo([...tempArray]);
      }


      /**
       * @function useEffect
       * call the getBatches function on load of page
       */
      useEffect(()=>{
        getBatches();
      },[]);


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
                    <Form className="batch-form" onSubmit={(e:React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                        <h5>Map Batch To Client</h5>
                        <Input type="select">
                            <option>Select Client</option>
                            <option>Dummy Client 1</option>
                            <option>Dummy Client 2</option>
                        </Input>
                        <br/>
                        <Input type="select">
                            <option disabled selected>Select Batch:</option>
                            {batchInfo.map((e:any,i:any) =>
                                <option key={i} id={e.id} >{e.name}</option>
                            )}
                        </Input>
                        <input className="batch-form-submit" type="submit" value="Submit" ></input>
                    </Form>
                </Col>
                <Col sm="5" md="5" lg="4" xl="3" className="text-right" style={{marginTop:"50px"}}>
                    <Form className="batch-form" onSubmit={(e:React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                        <h5>Unmap Batch From Client</h5>
                        <Input type="select">
                            <option>Select Client</option>
                            <option>Dummy Client 1</option>
                            <option>Dummy Client 2</option>
                        </Input>
                        <br/>
                        <Input type="select">Select Batch
                            <option disabled selected>Select Batch:</option>
                            {batchInfo.map((e:any,i:any) =>
                                <option key={i} id={e.id} value={e.id} >{e.name}</option>
                            )}
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
                            <option disabled selected>Select Batch</option>
                            {batchInfo.map((e:any,i:any) =>
                                <option key={i} id={e.id} >{e.name}</option>
                            )}
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
                            {batchInfo.map((e:any,i:any) =>
                                <option key={i} id={e.id} >{e.name}</option>
                            )}
                        </Input>
                        <input className="modal-batch-form-submit" type="submit" value="Submit"></input>
                    </Form>
            </ModalBody>
         </Modal>
        </>

    );
}
