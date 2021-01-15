import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { NavBar } from "../../components/NavBar/NavBar";
import {
  Container,
  DropdownItem,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Notifications from "../../components/Notifications/Notifications";
import Message from "../../components/Notifications/Message";
import { axiosInstance } from "../../util/axiosConfig";

interface IProps {
  rerender: boolean;
  doRerender: () => void;
}

export const MessagesPage: React.FC<IProps> = (props: IProps) => {
  const [show, setShow] = React.useState(false);
  const toggle = () => setShow(!show);
  const [batchInfo, setBatchInfo] = useState<any>([]);

  const getBatches = async () => {
    const response = await (await axiosInstance()).get("admin/batch/allNames");
    const tempArray = [];
    for (const r of response.data) {
      const id = r.batchId;
      const name = r.name;
      tempArray.push({ id, name });
    }

    /**
     * @function setBatchInfo
     * spreading the tempArray and assigning all values to the batchInfo
     */
    setBatchInfo([...tempArray]);
  };

  useEffect(() => {
    getBatches();
  }, []);

  return (
    <>
      <Container
        style={{
          minHeight: "100vh",
          maxWidth: "100vw",
          backgroundColor: "#E3E3E3",
        }}
      >
        <NavBar>
          <Link to="/home">
            <DropdownItem>Return to Client Home</DropdownItem>
          </Link>
        </NavBar>

        <br></br>
        <button onClick={toggle} className="btn btn-primary mr-2">
          new message
        </button>

        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader>
            <div>New Message</div>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={() => console.log("hello")}>
              <FormGroup>
                <Label for="subject" className="talentTextAreaLabel">
                  Subject:
                </Label>
                <Input
                  // type="textarea"
                  name="subject"
                  className="subjectTextAreaInput"
                  placeholder="Title"
                ></Input>
                <Label for="subject" className="talentTextAreaLabel">
                  Batch (Drop down menu of attached batches):
                </Label>
                <Input
                  type="select"
                  name="subject"
                  className="subjectTextAreaInput"
                  placeholder="Please enter important information regarding the talent you require"
                >
                  <option disabled selected>
                    Select Batch
                  </option>
                  {batchInfo.map((e: any, i: any) => (
                    <option key={i} id={e.id} value={e.email}>
                      {e.name}
                    </option>
                  ))}
                </Input>
                <Label for="subject" className="talentTextAreaLabel">
                  Body
                </Label>
                <Input
                  type="textarea"
                  name="subject"
                  className="talentTextAreaInput"
                  placeholder="Please enter important information regarding the talent you require"
                ></Input>
                <input
                  type="submit"
                  value="Submit"
                  className="talentSubmit"
                ></input>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        <br></br>

        <Message></Message>
      </Container>
      <Notifications></Notifications>
    </>
  );
};
