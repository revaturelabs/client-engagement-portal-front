import 'firebase/auth'
import React, { ChangeEvent, useState } from "react";
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
  Container,
} from "reactstrap";
import '../../scss/NewClientButton.scss';
import { axiosInstance } from "../../util/axiosConfig";
import {signUp} from "../../util/FirebaseContainer";

interface IProps {
  reloadClientDropdowns: () => void
}

/**
 * @function newClientButton
 * This component includes the button for a new client account
 *
 * This also has a modal form that pops up when the button is clicked
 *
  */
export const NewClientButton: React.FC<IProps> = (props: IProps) => {
  const [modal, setModal] = useState(false);

  // Decided to eliminate Redux to help with tests, it's unnecessary anyway
  // const dispatch = useDispatch();

  /**
   * @function toggle
   * When the create account button is clicked it opens the modal.
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
  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // These need to be up here. Data is dropped when user is checked {for some reason} <= these fields are cleared when the modal unloads
    const email = event.currentTarget["email"].value;
    const password = event.currentTarget["password"].value;
    const role = event.currentTarget["select"].value;
    let firstName;
    let lastName;
    let companyName;
    let phoneNumber;

    if (role === 'client') {
      companyName = event.currentTarget["companyName"].value;
      phoneNumber = event.currentTarget["phoneNumber"].value;
    } else {
      firstName = event.currentTarget["firstName"].value;
      lastName = event.currentTarget["lastName"].value;
    }

    setModal(!modal);

    try {

      signUp(email, password);

      if (role === "client") {
        (await axiosInstance()).post("/client/", {
          clientBatches: [],
          clientId: 0,
          companyName: companyName,
          email: email,
          phoneNumber: phoneNumber,
        });

        props.reloadClientDropdowns();
      } else if (role === "admin") {
        (await axiosInstance()).post("/admin/new", { 
          adminId: 0,
          email: email,
          firstName: firstName,
          lastName: lastName
        })
      }

    } catch (error) {
      return false;
    }
    return true;
  };

  const [accountType, setAccountType] = useState("client");

  /**
   *
   * @param event
   *
   * this function calls setAccountType which takes in the event element and sets it to accountType.
   */
  const changeForm = (event: ChangeEvent<HTMLInputElement>) =>
    setAccountType(event.target.value);

  return (
    <>
      <Button onClick={toggle} className="create-account-button">
        Create Account
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="container create-account-modal-header">
          Create Account
            </ModalHeader>
        <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => registerUser(event)} id="new-client-button-form">
          <ModalBody>
            {/* <Form onSubmit={registerUser}> */}
            <FormGroup>
              <Label for="exampleSelect">Account Type</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                placeholder="Client Type"
                onChange={changeForm}
              >
                <option value="client" defaultValue="client">Client</option>
                <option value="admin" defaultValue="admin">Admin</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" required name="email" id="email"></Input>
            </FormGroup>
            {accountType === "client" ? (<>
              <FormGroup>
                <Label>Company Name</Label>
                <Input type="text" required name="companyName" id="companyName"></Input>
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input type="tel" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required name="phoneNumber" id="phoneNumber"></Input>
              </FormGroup>
            </>
            ) : (
                <><Container>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>First Name</Label>
                      <Input type="text" required name="firstName" id="firstName"></Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Input type="text" required name="lastName" id="lastName"></Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Container></>
              )}
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                required
                minLength={6}
                name="password"
                id="password"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input type="password" name="confirmation"></Input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Input type="submit" value="Submit" className="create-account-submit" />
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};
