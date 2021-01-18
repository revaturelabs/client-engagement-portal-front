import React from 'react';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import './PlanInterventionModal.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '../../_reducers';
import { axiosInstance } from '../../util/axiosConfig';


/**
 * @function PlanInterventionModalv2
 * This component includes the button for requesting talent and the modal pop
 * when the button is clicked.
 */
const PlanInterventionModalv2:React.FC = () => {

    const [show, setShow] = React.useState(false);
    const toggle = () => setShow(!show);

    /**
       * sets clientEmail equal to the email of the client that is logged in
       */
    let clientEmail = useSelector((state: IRootState) => {
        return `${state.userState.user?.email}`
    });

    /**
      * @Function requestTalentFormSubmit
      * Send form data to the backend to request more talent
      * 
      * @param event 
      * Collecting information from the form
      */
    const requestInterventionFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const message = event.currentTarget["message"].value;
        const requestType = "INTERVENTION";
        try {
            (await axiosInstance()).post(`intervention/`, {
                clientEmail: clientEmail,
                message: message,
                requestId: 0,
                requestType: requestType,
                status: "PENDING",
            });
        }
        catch(error) {
            return false;
        }
        toggle();
        alert("Request Received!")
        return true;
    };

    return (

        <>  
            <button onClick={toggle} className="intervention-button">Request Intervention</button>
            <Modal isOpen={show} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <h4>Request Intervention</h4>
                </ModalHeader>
                <ModalBody style={{textAlign: "center"}}>
                    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => requestInterventionFormSubmit(event)}>
                    <FormGroup>
                        <Label for="message" className="TextAreaLabel">Message:</Label>
                        <Input type="textarea" name="message" className="TextAreaInput" placeholder="Reason for intervention, target dates/times, etc..."/>
                        <input type="submit" value="Submit" className="talentSubmit"/>
                    </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default PlanInterventionModalv2;
