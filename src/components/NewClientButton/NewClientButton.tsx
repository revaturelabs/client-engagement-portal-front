import { Auth } from "aws-amplify";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
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
import './NewClientButton.scss'
import { convertCompilerOptionsFromJson, isConstructorDeclaration } from "typescript";

//This component includes the button for a new client account
//This also has a modal form that pops up when the button is clicked

export const NewClientButton: React.FC<any> = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const registerUser = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget["email"].value;
    const password = event.currentTarget["password"].value;

    // console.log("Email: " + email + "\nPassword: " + password);

    setModal(!modal);
    
    try{
      // const signUpResult =
      await Auth.signUp({
        username: email,
        password: password
      });

      // console.log("Cognito User: " + signUpResult.user + "\nUserConfirmed: " + signUpResult.userConfirmed +
      //             "\nUserSub: " + signUpResult.userSub + "\nCode delivery details: " + signUpResult.codeDeliveryDetails);

      // console.log(signUpResult.user);
      // console.log(signUpResult.codeDeliveryDetails);
    } catch(error){
      console.log("Couldn't sign up: ", error);
      // Runs if you create a user with a duplicate email or if you try creating a password with less than 6 characters
    }

  }

  const [accountType, setAccountType] = useState(" ");

  //Setting the state on accountType for conditional rendering
  const changeForm = (event:ChangeEvent<HTMLInputElement>) => {
    setAccountType (event.target.value);
  }

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
          <Form onSubmit={(event:React.FormEvent<HTMLFormElement>) => registerUser(event)}>
        <ModalBody>
          {/* <Form onSubmit={registerUser}> */}
            <FormGroup>
              <Label for="exampleSelect">Select Account</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                placeholder="Client Type"
                onChange={changeForm} 
              >
                <option>Select Account</option>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </Input>
            </FormGroup> 
            {(accountType === "client")? 
            <FormGroup className="isClient">
              <Label>Email</Label>
              <Input type="text" required name="email"></Input>
              <Label>Name</Label>
              <Input type="text" required></Input>
              <Label>Password</Label>
              <Input type="password" required minLength={6} name="password"></Input>
              <Label>Confirm Password</Label>
              <Input type="password"></Input>
              <Label>Company Name</Label>
              <Input type="text" required name="companyName"></Input>
            </FormGroup>
            : (accountType==="admin")?
            <FormGroup className="isAdmin">
              <Label>Email</Label>
              <Input type="text" required name="email"></Input>
              <Label>Name</Label>
              <Input type="text" required></Input>
              <Label>Password</Label>
              <Input type="password" required minLength={6} name="password"></Input>
              <Label>Confirm Password</Label>
              <Input type="password"></Input>
            </FormGroup>:
            <div/>
            }

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