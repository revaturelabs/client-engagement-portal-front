import { Auth } from "aws-amplify";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col} from "reactstrap";
import { convertCompilerOptionsFromJson, isConstructorDeclaration } from "typescript";

/**
 * @function newClientButton
 * This component includes the button for a new client account
 * 
 * This also has a modal form that pops up when the button is clicked
 */

export const NewClientButton: React.FC<any> = () => {
  const [modal, setModal] = useState(false);

  /**
   * @function toggle
   * 
   * When the create account button is clicked it opens the modal.
   * 
   * When clicking anywhere outside of the form on the "x" it hides the modal
   */
  const toggle = () => setModal(!modal);


  /**
   * @function registerUser
   * Collect information and sends it to AWS to get authorized 
   * 
   * @param event 
   * Collecting the information form the form
   * 
   * @param error
   * If the user fails to sign up they will get a message letting them know they can not sign up
   * 
   */
  const registerUser = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget["email"].value;
    const password = event.currentTarget["password"].value;
    setModal(!modal);
    try{
      await Auth.signUp({
        username: email,
        password: password
      });
    } catch(error){
      console.log("Couldn't sign up: ", error);
    }
  }

  const [accountType, setAccountType] = useState(" ");

  /**
   * 
   * @param event 
   * 
   * this function calls setAccountType which takes in the event element and sets it to accountType.
   */
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
            >
            Submit
          </Button>
        </ModalFooter>
            </Form>
      </Modal>
    </>
  );
};
