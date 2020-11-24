import React, { ChangeEvent, useState } from "react";
import { Auth } from "aws-amplify";
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
import { useDispatch } from "react-redux";
import { logout } from "../../actions/UserActions";


/**
 * @function newClientButton
 * This component includes the button for a new client account
 *
 * This also has a modal form that pops up when the button is clicked
 *
  */
export const NewClientButton: React.FC<any> = () => {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

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
  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    // These need to be up here. Data is dropped when user is checked {for some reason} <= these fields are cleared when the modal unloads
    const email = event.currentTarget["email"].value;
    const password = event.currentTarget["password"].value;
    const role = event.currentTarget["select"].value;
    const firstName = event.currentTarget["firstName"].value;
    const lastName = event.currentTarget["lastName"].value;

    // Checks cognito if they have the admin role in the current session  for security. If not exit out
    // This checking operation takes about 150 MS
    // Unknown Error - Response time can be 10,000 MS. Usually happens when react is updating. This shouldn't be a problem

    const checkRole = Auth.currentUserInfo();
    const checker = await checkRole.then(function (result) {

      if (result.attributes["custom:userRole"] !== "admin") {
        dispatch(logout());
        return false;
      } else {
        return true;
      }
    });

    if (!checker) {
      console.log("Error: User does not have permissions to create an account");
      return null;
    }
    console.log("Before signup")
    setModal(!modal);

    try {
      const signUpResult = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          "custom:userRole": role, // custom role for assigning user to admin or client role
          "given_name": firstName,
          "family_name": lastName
        },
      });

      console.log(
        "Cognito User: " +
        signUpResult.user +
        "\nUserConfirmed: " +
        signUpResult.userConfirmed +
        "\nUserSub: " +
        signUpResult.userSub +
        "\nCode delivery details: " +
        signUpResult.codeDeliveryDetails
      );

      if (role === "client") {
        (await axiosInstance()).post("/client/", { // Client does not have firstName and lastName; this must be retrieved from Cognito upon login
          clientBatches: [],
          clientId: 0,
          companyName: event.currentTarget["companyName"].value,
          email: email,
          phoneNumber: event.currentTarget["phoneNumber"].value,
        });
      } else if (role === "admin") {
        (await axiosInstance()).post("/admin/new", { // Should also retrieve Admin firstName and lastName from Cognito; it saves a database request
          adminId: 0,
          email: email,
          firstName: firstName,
          lastName: lastName
        })
      }

      // console.log(signUpResult.user);
      // console.log(signUpResult.codeDeliveryDetails);
    } catch (error) {
      console.log("Couldn't complete signup: ", error);
    }
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
        <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => registerUser(event)}>
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
              <Input type="text" required name="email"></Input>
            </FormGroup>
            <Container>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>First Name</Label>
                    <Input type="text" required name="firstName"></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Last Name</Label>
                    <Input type="text" required name="lastName"></Input>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
            {accountType === "client" ? (<>
              <FormGroup>
                <Label>Company Name</Label>
                <Input type="text" required name="companyName"></Input>
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input type="tel" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required name="phoneNumber"></Input>
              </FormGroup>
            </>
            ) : (
                <></>
              )}
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
              <Input type="password" name="confirmation"></Input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <input type="submit" className="create-account-submit">
            </input>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};
