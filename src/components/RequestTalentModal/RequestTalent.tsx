import React from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import "./RequestTalent.scss";
import { useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { axiosInstance } from "../../util/axiosConfig";
import emailjs from "emailjs-com";

/**
 * @function RequestTalent
 * This component includes the button for requesting talent and the modal pop
 * when the button is clicked.
 */
const RequestTalent: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const toggle = () => setShow(!show);

  /**
   * sets clientEmail equal to the email of the client that is logged in
   */
  let clientEmail = useSelector((state: IRootState) => {
    return `${state.userState.user?.email}`;
  });

  /**
   * @Function requestTalentFormSubmit
   * Send form data to the backend to request more talent
   *
   * @param event
   * Collecting information from the form
   */

  const requestTalentFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const email = clientEmail;
    const message = event.currentTarget["message"].value;
    const requestType = "TALENT";

    try {
      (await axiosInstance())
        .post(`intervention/`, {
          clientEmail: email,
          message: message,
          requestId: 0,
          requestType: requestType,
          status: "PENDING",
        })
        .then((response) => {
          const data = response;
          console.log("post intervention ", data);
          console.log("data: ", data.config.data);
        });
    } catch (error) {
      return false;
    }
    toggle();

    const reqReceived = document.getElementById("talentRequested");
    if (reqReceived)
      (reqReceived as HTMLElement).innerText = "Request Received!";

    return true;
  };

  var adminList: Number[] = [];
  var adminEmailList: String[] = [];
  var ClientId: Number;
  var Company: String;
  var Message: String;
  async function NoticeAdmin() {
    Message = (document.getElementById("message") as HTMLInputElement).value;
    console.log(
      "You get a notification from Client: ",
      "\n",
      " Message: ",
      Message
    );
    (await axiosInstance())
      .get(`client/email/${clientEmail}`)
      .then((response) => {
        const data = response;
        console.log("clientinfo ", data);
        ClientId = data.data.clientId;
        Company = data.data.companyName;
      });

    (await axiosInstance()).get(`admin/`).then((response) => {
      const data = response;
      for (let i = 0; i < data.data.length; i++) {
        console.log("adminEmail: ", data.data[i].email);
        adminEmailList.push(data.data[i].email);
        adminList.push(data.data[i].adminId);
      }

      for (let email of adminEmailList) {
        console.log(adminList);
        let mailOptions = {
          adminEmail: email,
          companyName: Company,
          clientEmail: clientEmail,
          message: Message,
        };
        emailjs
          .send(
            "service_ez8xblh",
            "template_jzfjnqq",
            mailOptions,
            "user_QXqN3hWGagW9ce3rVl9Ei"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      }
      postRequestMsg();
    });
  }

  async function postRequestMsg() {
    Message = (document.getElementById("message") as HTMLInputElement).value;
    (await axiosInstance())
      .post(`msg/client`, {
        adminEmail: null,
        clientEmail: clientEmail,
        message: Message,
      })
      .then((res) => {
        console.log(res);
      });
    console.log("clientId", clientEmail);
    console.log("imessage", Message);
  }

  return (
    <>
      <Row
        className="row justify-content-center"
        style={{ marginTop: "300px" }}
      >
        <button onClick={toggle} className="intervention-button">
          Request More Talent
        </button>
      </Row>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h4>Request More Talent</h4>
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
              requestTalentFormSubmit(event)
            }
          >
            <FormGroup>
              <Label for="message" className="talentTextAreaLabel">
                Message:
              </Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                className="talentTextAreaInput"
                placeholder="Please enter important information regarding the talent you require"
              ></Input>
              <input
                type="submit"
                value="Submit"
                className="talentSubmit"
                onClick={NoticeAdmin}
              ></input>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <br />
      <Row className="row justify-content-center">
        <h4 id="talentRequested"></h4>
      </Row>
    </>
  );
};

export default RequestTalent;
