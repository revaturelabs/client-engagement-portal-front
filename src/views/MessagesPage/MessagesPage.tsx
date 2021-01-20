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
import Messages from "../../components/Notifications/Messages";
import { axiosInstance } from "../../util/axiosConfig";
import { MessageModal } from "../../components/MessagesModals/MessageModal";
import { useSelector } from "react-redux";
import { IRootState } from "./../../_reducers/index";

export const MessagesPage: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const [clients, setClients] = React.useState<any>([]);
  const [admins, setAdmins] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const toggleShow = () => setShow(!show);
  let userEmail = useSelector((state: IRootState) => {
    return `${state.userState.user?.email}`;
  });
  let role = useSelector((state: IRootState) => {
    return `${state.userState.user?.role}`;
  });

  useEffect(() => {
    console.log("hello");
    getClients();
  }, [show]);

  const getClients = async () => {
    let fetchedClients = await (await axiosInstance()).get("/client/");
    const tempArray = [];
    for (const r of fetchedClients.data) {
      const id = r.clientId;
      const name = r.companyName;
      const email = r.email;
      tempArray.push({ id, name, email });
    }
    setClients([...tempArray]);
  };

  console.log(clients);
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
          <Link to={role === "admin" ? "/admin" : "/home"}>
            <DropdownItem>
              Return to {role === "admin" ? "Admin" : "Client"} Home
            </DropdownItem>
          </Link>
        </NavBar>

        <br></br>
        <button onClick={toggleShow} className="btn btn-primary mr-2">
          New Message
        </button>

        <MessageModal
          show={show}
          toggle={toggleShow}
          clients={clients}
          admins={admins}
        />
        <br></br>
        <br></br>

        <Messages></Messages>
      </Container>
    </>
  );
};
