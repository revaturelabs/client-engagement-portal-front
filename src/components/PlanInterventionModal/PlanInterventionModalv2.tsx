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
import "./PlanInterventionModal.scss";
import { useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { axiosInstance } from "../../util/axiosConfig";
import emailjs from "emailjs-com";

/**
 * @function PlanInterventionModalv2
 * This component includes the button for requesting talent and the modal pop
 * when the button is clicked.
 */
const PlanInterventionModalv2: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const [clientInfo, setClientInfo] = React.useState({});
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
  const requestInterventionFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const message = event.currentTarget["message"].value;
    const requestType = "INTERVENTION";
    try {
      (await axiosInstance())
        .post(`intervention/`, {
          clientEmail: clientEmail,
          message: message,
          requestId: 0,
          requestType: requestType,
          status: "PENDING",
        })
        .then((response) => {
          const data = response;
          console.log("data ", data.config.data);
          setClientInfo(data.config.data);
          console.log("data2 ", clientInfo);
        });
    } catch (error) {
      return false;
    }
    toggle();
    alert("Request Received!");
    return true;
  };

  var adminList: Number[] = [];
  var adminEmailList: String[] = [];
  var ClientId: Number;
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
          message: Message,
        };
        emailjs
          .send(
            "service_780easr",
            "template_1co3ggw",
            mailOptions,
            "user_qNzha4WnrQ4xZeolBYZkl"
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
    for (let adminId2 of adminList) {
      (await axiosInstance())
        .post(`msg/client`, {
          adminId: adminId2,
          clientId: ClientId,
          message: Message,
        })
        .then((res) => {
          console.log(res);
        });
      console.log("idminId", adminId2);
      console.log("clientId", ClientId);
      console.log("imessage", Message);
    }
  }

  return (
    <>
      <button onClick={toggle} className="intervention-button">
        Request Intervention
      </button>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h4>Request Intervention</h4>
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <Form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
              requestInterventionFormSubmit(event)
            }
          >
            <FormGroup>
              <Label for="message" className="TextAreaLabel">
                Message:
              </Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                className="TextAreaInput"
                placeholder="Reason for intervention, target dates/times, etc..."
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
    </>
  );
};

export default PlanInterventionModalv2;
