import { Auth } from "aws-amplify";
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
import { isConstructorDeclaration } from "typescript";

//This component includes the button for a new client account
//This also has a modal form that pops up when the button is clicked

export const NewClientButton: React.FC<any> = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget["email"].value;
    const password = event.currentTarget["password"].value;

    // console.log("Email: " + email + "\nPassword: " + password);

    setModal(!modal);

    try {
      // const signUpResult =
      await Auth.signUp({
        username: email,
        password: password,
      });

      // console.log("Cognito User: " + signUpResult.user + "\nUserConfirmed: " + signUpResult.userConfirmed +
      //             "\nUserSub: " + signUpResult.userSub + "\nCode delivery details: " + signUpResult.codeDeliveryDetails);

      // console.log(signUpResult.user);
      // console.log(signUpResult.codeDeliveryDetails);
    } catch (error) {
      console.log("Couldn't sign up: ", error);
      // Runs if you create a user with a duplicate email or if you try creating a password with less than 6 characters
    }
  };

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
        id={"toggleButton"}
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
        <Form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            registerUser(event)
          }
        >
          <ModalBody>
            {/* <Form onSubmit={registerUser}> */}
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
              <Input type="text" required name="email"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" required></Input>
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                required
                minLength={6}
                name="password"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input type="password"></Input>
            </FormGroup>
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

              // onClick={toggle} // This causes the form to toggle off before it's submitted; remember event bubbling!
              // LINE 96: This now submits the form, and it will close the modal only if the signup was successful.
            >
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};
