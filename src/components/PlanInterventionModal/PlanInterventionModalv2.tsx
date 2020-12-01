import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import './PlanInterventionModal.scss'


const PlanInterventionModalv2:React.FC = () => {

    const [show, setShow] = React.useState(false);
    const toggle = () => setShow(!show);

    return (

        <>
            <button onClick={toggle} className="intervention-button">Request Intervention</button>

            <Modal isOpen={show} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <h4>Request Intervention</h4>
                </ModalHeader>
                <ModalBody style={{textAlign: "center"}}>
                    <div className="TextAreaContainer" style={{display:"inline-block"}}>
                        <div className="TextAreaLabel">Reason For Intervention: </div>
                        <textarea className="TextAreaInput" style={{display: "block"}} />
                    </div>
                    <div className="DatePickerContainer">
                        <div className="DatePickerLabel">Schedule An Intervention Date: </div>
                        <input type="date" className="DatePicker"/>
                    </div>
                    <div className="SubmitButtonContainer">
                        <button className="SubmitButton">Submit</button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default PlanInterventionModalv2;
