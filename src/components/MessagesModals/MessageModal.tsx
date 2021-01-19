import React, { useState } from "react";
import { axiosInstance } from "../../util/axiosConfig";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "./MessageModal.scss";
import { useSelector } from "react-redux";
import { INewMessageProps } from "./../../_reducers/MessageReducer";
import { IUserState } from "../../_reducers/UserReducer";
import { IRootState } from "../../_reducers";

export const MessageModal: React.FC<INewMessageProps> = (props) => {
  let userEmail = useSelector((state: IRootState) => {
    return `${state.userState.user?.email}`;
  });
  let role = useSelector((state: IRootState) => {
    return `${state.userState.user?.role}`;
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let title = (event.target as any).elements.title.value; // Not type safe, but had to get it in
    let body = (event.target as any).elements.body.value;
    try {
      if (role === "admin") {
        let clientEmail = (event.target as any).elements.client.value;
        (await axiosInstance()).post(`msg/admin`, {
          adminEmail: userEmail,
          clientEmail: clientEmail,
          message: body,
          title: title,
        });
      } else {
        props.admins.map(async (admin) => {
          (await axiosInstance()).post(`msg/client`, {
            adminEmail: admin.email, // TODO future iteration, please change: no hard coded emails
            clientEmail: userEmail,
            message: body,
            title: title,
          });
        });
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    props.toggle();
  };

  return (
    <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader>
        <div>New Message</div>
      </ModalHeader>
      <Form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(event)
        }
      >
        <ModalBody>
          <FormGroup>
            <Label className="newMessageLabel">Title:</Label>
            <Input
              type="text"
              required
              name="title"
              placeholder="Title"
            ></Input>
          </FormGroup>
          {props.isAdmin && (
            <FormGroup>
              <Label for="client" className="newMessageLabel">
                Client:
              </Label>
              <Input required type="select" name="client">
                {props.clients.map((e: any, i: any) => (
                  <option key={i} id={e.clientId} value={e.email}>
                    {e.companyName}
                  </option>
                ))}
              </Input>
            </FormGroup>
          )}
          <FormGroup>
            <Label for="body" className="newMessageLabel">
              Body:
            </Label>
            <Input
              required
              type="textarea"
              name="body"
              className="talentTextAreaInput"
              placeholder="This is where your message goes."
            ></Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Input
            type="submit"
            value="Send Message"
            className="send-message-button"
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};
