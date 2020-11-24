import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Form, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import '../../scss/BatchFormStyle.scss';
import { axiosInstance } from '../../util/axiosConfig';

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
    const [unmapBatchInfo, setUnmapBatchInfo] = useState<any>([]);
    const [clientInfo, setClientInfo]=useState<any>([]);

    /**
     * @function getBatches
     * loops though batch objects to extract and assign appropriate data
     * @async
     * Creates an axios get call to gather batch information
     *
     */
    const getBatches = async () => {
        // const response = await axiosInstance.get("admin/batch/allNames")
        const response = await axios.get("http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/admin/batch/allNames")
        const tempArray=[];
        for (const r of response.data)
        {
          const id = r.batchId;
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
        getClients();
      },[]);


      /**
       * 
       * @param event 
       */
    const mapBatches = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const clientEmail=event.currentTarget["mappedClientEmail"].value;
        const batchId = event.currentTarget["mappedBatchId"].value;
        const response = await axios.put("http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/admin/mapBatchToClient?batchId="+batchId+"&email="+clientEmail);
    }

    /**
     * 
     * @param event 
     */
    const unmapBatches = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const clientEmail=event.currentTarget["unmappingClientEmail"].value;
        const batchId = event.currentTarget["unmappingBatchId"].value;
        const response = await axios.put("http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/admin/unmapBatchFromClient?batchId="+batchId+"&email="+clientEmail);
    }

    /**
     * 
     */
    const getClients = async () =>{
        const response = await axios.get("http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/client/")
        const tempArray=[];
        for (const r of response.data)
        {
          const id = r.clientId
          const name = r.companyName;
          const email=r.email
          tempArray.push({id,name,email});
      }
  
      /**
       * @function setBatchInfo
       * spreading the tempArray and assigning all values to the clientInfo
       */
      setClientInfo([...tempArray]);

    }

    /**
     * 
     * @param event 
     */
    const getClientsToBatches = async(event: React.ChangeEvent<HTMLInputElement>)=>{
        const clientEmail=event.target.value;
        const response = await axios.get('http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/client/batch/email/'+clientEmail);
        const tempArray=[];
        for (const r of response.data)
        {
          const id = r.batchId;
          const name = r.name;
          tempArray.push({id,name});
      }
      setUnmapBatchInfo([...tempArray]);
    }
      
    return (
        <>
         <Row className="justify-content-center my-button-row">
                <Col xs="2" sm="3" lg="5" />
                <Col xs="8" sm="6" lg="2">
                    <button className="batch-form-button" id='map-batch' onClick={toggleMap}>Map Batch To Client</button>
                </Col>
                <Col xs="2" sm="3" lg="5" />
            </Row>
            <Row className="justify-content-center my-button-row">
                <Col xs="2" sm="3" lg="5" />
                <Col xs="8" sm="6" lg="2">
                    <button className="batch-form-button" id='unmap-batch' onClick={toggleUnmap}>Unmap Batch From Client</button>
                </Col>
                <Col xs="2" sm="3" lg="5" />
            </Row>
            <Row className="justify-content-between my-form-row">
                <Col sm="1" md="1" lg="2" xl="3"></Col>
                <Col sm="5" md="5" lg="4" xl="3" className="text-left" style={{marginTop:"50px"}}>
                    <Form className="batch-form"  onSubmit={mapBatches}>
                        <h5>Map Batch To Client</h5>
                        <Input type="select" name="mappedClientEmail">
                            <option disabled selected>Select Client</option>
                            {clientInfo.map((e:any,i:any)=>
                                <option key={i} id={e.id} value={e.email}>{e.name}</option>
                            )}
                            
                        </Input>
                        <br/>
                        <Input type="select" name="mappedBatchId">
                            <option disabled selected>Select Batch:</option>
                            {batchInfo.map((e:any,i:any) =>
                                <option key={i} value={e.id}>{e.name}</option>
                            )}
                        </Input>
                        <input className="batch-form-submit" type="submit" value="Submit" id="test-submit-map" ></input>
                    </Form>
                </Col>
                <Col sm="5" md="5" lg="4" xl="3" className="text-right" style={{marginTop:"50px"}}>
                    <Form className="batch-form"  onSubmit={unmapBatches}>
                        <h5>Unmap Batch From Client</h5>
                        <Input type="select" name="unmappingClientEmail" id="map-client-to-batch" onChange={getClientsToBatches}>
                            <option disabled selected>Select Client</option>
                            {clientInfo.map((e:any,i:any)=>
                                <option key={i} value={e.email}>{e.name}</option>
                            )}
                        </Input>
                        <br/>
                        <Input type="select" name="unmappingBatchId">Select Batch
                            <option disabled selected>Select Batch:</option>
                            {unmapBatchInfo.map((e:any,i:any) =>
                                <option key={i} value={e.id} >{e.name}</option>
                            )}
                        </Input>

                        <input className="batch-form-submit" type="submit" value="Submit" id="test-submit-unmap"></input>
                    </Form>
                </Col>
                <Col sm="1" md="1"  lg="2" xl="3"></Col>
            </Row>

          {/* Map Modal */}
         <Modal isOpen={mapModal} toggle={toggleMap} className="batch-form-modal" id="test-map">
            <ModalHeader toggle={toggleMap} className="modal-header" >
              Map Batch to Client
            </ModalHeader>
            <ModalBody>
            <Form className="modal-batch-form" onSubmit={mapBatches}>
                        <Input type="select" name="mappedClientEmail">
                            <option disabled selected>Select Client</option>
                            {clientInfo.map((e:any,i:any)=>
                                <option key={i} id={e.id} value={e.email}>{e.name}</option>
                            )}
                            
                        </Input>
                        <br/>
                        <Input type="select" id='map-options' name="mappedBatchId" >
                            <option disabled selected>Select Batch</option>
                            {batchInfo.map((e:any,i:any) =>
                                <option key={i} value={e.id} >{e.name}</option>
                            )}
                        </Input>
                        <input className="modal-batch-form-submit" type="submit" value="Submit" ></input>
                    </Form>
            </ModalBody>
         </Modal>

         {/* UnMap Modal */}
         <Modal isOpen={unmapModal} toggle={toggleUnmap} className="batch-form-modal" id="test-unmap">
            <ModalHeader toggle={toggleUnmap} className="modal-header" >
              Unmap Batch from Client
            </ModalHeader>
            <ModalBody>
            <Form className="modal-batch-form">
            <Input type="select" name="unmappingClientEmail" onChange={getClientsToBatches}>
                            <option disabled selected>Select Client</option>
                            {clientInfo.map((e:any,i:any)=>
                                <option key={i} id={e.id} value={e.email}>{e.name}</option>
                            )}
                        </Input>
                        <br/>
                        <Input type="select"  name="unmappingBatchId">
                            <option>Select Batch</option>
                            {unmapBatchInfo.map((e:any,i:any) =>
                            <option key={i} value={e.id} >{e.name}</option>
                            )}
                            
                        </Input>    
                        <input className="modal-batch-form-submit" type="submit" value="Submit"></input>
                    </Form>
            </ModalBody>
         </Modal>
        </>

    );
}
