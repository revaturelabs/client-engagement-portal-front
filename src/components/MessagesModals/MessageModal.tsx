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
  console.log(props);
  let userEmail = useSelector((state: IRootState) => {
    // console.log(state);
    return `${state.userState.user?.email}`;
  });

  console.log(userEmail);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let url
    let title = (event.target as any).elements.title.value; // Not type safe, but had to get it in
    let body = (event.target as any).elements.body.value;
    console.log(title);
    console.log(body);
    // try {
    //   (await axiosInstance()).post(`msg/admin`, {
    //     adminId: 4,
    //     clientId: 2,
    //     message: body,
    //     title: title,
    //   });
    // } catch (error) {
    //   return false;
    // }
    // props.toggle();
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
            {props.isAdmin && (
              <div>
                <Label for="client" className="newMessageLabel">
                  Client:
                </Label>
                <Input type="select" name="client"></Input>
              </div>
            )}
            <Label for="body" className="newMessageLabel">
              Body:
            </Label>
            <Input
              type="textarea"
              name="body"
              className="talentTextAreaInput"
              placeholder="Say something nice."
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
