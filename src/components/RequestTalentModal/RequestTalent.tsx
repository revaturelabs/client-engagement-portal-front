import React from 'react';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import './RequestTalent.scss'
import { useSelector } from 'react-redux';
import { IRootState } from '../../_reducers';
import { axiosInstance } from '../../util/axiosConfig';

/**
 * @function RequestTalent
 * This component includes the button for requesting talent and the modal pop
 * when the button is clicked.
 */
const RequestTalent:React.FC = () => {

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
    const requestTalentFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = clientEmail;
        const message = event.currentTarget["message"].value;
        const requestType = "TALENT";

        try {
            (await axiosInstance()).post(`intervention/`, {
                clientEmail: email,
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

        // const reqReceived = document.getElementById("talentRequested");
        // if(reqReceived) (reqReceived as HTMLElement).innerText = "Request Received!";

        return true;
    }

    return (
        <>
            <Row className="row justify-content-end" style={{paddingLeft: 15, paddingRight: 15}}>
                <button onClick={toggle} className="intervention-button">Request More Talent</button>
            </Row>
            <Modal isOpen={show} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <h4>Request More Talent</h4>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => requestTalentFormSubmit(event)}>
                    <FormGroup>
                        <Label for="message" className="talentTextAreaLabel">Message:</Label>
                        <Input type="textarea" name="message" className="talentTextAreaInput" placeholder="Please enter important information regarding the talent you require"></Input>
                        <input type="submit" value="Submit" className="talentSubmit"></input>
                    </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            <br/>
            <Row className="row justify-content-center">
                <h4 id="talentRequested"></h4>
            </Row>
        </>
    );
}

export default RequestTalent;
