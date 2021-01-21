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
import { INewMessageProps } from "../../_reducers/MessagesReducer";
import { Store } from "../../types";

export const MessageModal: React.FC<INewMessageProps> = (props) => {
  let userEmail = useSelector((state: Store) => {
    return `${state.userState.user?.email}`;
  });
  let role = useSelector((state: Store) => {
    return `${state.userState.user?.role}`;
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let title = (event.target as any).elements.title.value; // Not type safe, but had to get it in
    let body = (event.target as any).elements.body.value;
    if (role === "admin") {
      let clientEmail = (event.target as any).elements.client.value;
      (await axiosInstance())
        .post(`msg/admin`, {
          adminEmail: userEmail,
          clientEmail: clientEmail,
          message: body,
          title: title,
        })
        .catch((error) => console.log(error));
    } else {
      (await axiosInstance())
        .post(`msg/client`, {
          clientEmail: userEmail,
          message: body,
          title: title,
        })
        .catch((error) => console.log(error));
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
          {role === "admin" && (
            <FormGroup>
              <Label for="client" className="newMessageLabel">
                Client:
              </Label>
              <Input required type="select" name="client">
                {props.clients.map((e: any, i: any) => (
                  <option key={i} id={e.clientId} value={e.email}>
                    {e.name}
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
