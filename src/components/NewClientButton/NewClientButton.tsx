import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";

//This component includes the button for a new client account
//This also has a modal form that pops up when the button is clicked

export const NewClientButton: React.FC<any> = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button
        style={{
          backgroundColor: "#F26925",
          fontFamily: " futura-pt, sans-serif",
          fontStyle: "normal",
          fontWeight: 300,
          width: "16rem",
          border: "none",
        }}
        onClick={toggle}
      >
        Create Account
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <Row>
          <Col xs="6">
            <ModalHeader
              className="container"
              style={{
                color: "#F26925",
                display: "flex",
                justifyContent: "space-between",
                marginRight: "50%",
              }}
            >
              Create Account
            </ModalHeader>
          </Col>
          <Col xs="6">
            <Button
              className="close"
              style={{
                backgroundColor: "white",
                color: "#F26925",
                border: "none",
                fontWeight: 800,
                padding: "15px",
              }}
              onClick={toggle}
            >
              X
            </Button>
          </Col>
        </Row>
        <ModalBody>
          {/* <Form onSubmit={registerUser}> */}
          <Form>
            <FormGroup>
              <Label for="exampleSelect">Client Type</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                placeholder="Client Type"
              >
                <option>Client Type 1</option>
                <option>Client Type 2</option>
                <option>Client Type 3</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="text"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input type="text"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input type="text"></Input>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            style={{
              margin: "auto",
              backgroundColor: "#F26925",
              fontFamily: " futura-pt, sans-serif",
              fontStyle: "normal",
              fontWeight: 300,
              width: "10rem",
              border: "none",
              fontSize: "1.5rem",
            }}
            onClick={toggle}
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};