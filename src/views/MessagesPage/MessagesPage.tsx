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
import { MessageModal } from "../../components/MessagesModals/MessageModal";
import { ReplyMessageModal } from "./../../components/MessagesModals/ReplyModal";
import { useSelector } from "react-redux";
import { IRootState } from "./../../_reducers/index";

export const MessagesPage: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const toggleShow = () => setShow(!show);
  let userEmail = useSelector((state: IRootState) => {
    // console.log(state);
    return `${state.userState.user?.email}`;
  });
  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      await (await axiosInstance()).get("/admin/").then((resp) => {
        setIsAdmin(resp.data.some((item: any) => item.email === userEmail));
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(isAdmin);

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
          new message
        </button>

        <MessageModal show={show} toggle={toggleShow} isAdmin={isAdmin} />
        <br></br>

        <Message></Message>
      </Container>
      <Notifications></Notifications>
    </>
  );
};
