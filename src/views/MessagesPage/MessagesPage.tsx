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
  const [clients, setClients] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const toggleShow = () => setShow(!show);
  let userEmail = useSelector((state: IRootState) => {
    return `${state.userState.user?.email}`;
  });
  useEffect(() => {
    getAdmins();
    getClients();
  }, []);

  const getAdmins = async () => {
    try {
      await (await axiosInstance()).get("/admin/").then((resp) => {
        setAdmins(resp.data);
        setIsAdmin(resp.data.some((item: any) => item.email === userEmail));
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getClients = async () => {
    try {
      await (await axiosInstance()).get("/client/").then((resp) => {
        setClients(resp.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        <button onClick={toggleShow} className="btn btn-primary mr-2">
          New Message
        </button>

        <MessageModal
          show={show}
          toggle={toggleShow}
          isAdmin={isAdmin}
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
