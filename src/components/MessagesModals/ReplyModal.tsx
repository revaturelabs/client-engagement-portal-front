import React from "react";
import { axiosInstance } from "../../util/axiosConfig";
import {
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";
import { IReplyModalProps } from "../../_reducers/MessageReducer";

export const ReplyMessageModal: React.FC<IReplyModalProps> = (props) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let title = (event.target as any).elements.title.value; // Not type safe, but had to get it in
    let body = (event.target as any).elements.body.value;
    console.log(title);
    console.log(body);
    try {
      (await axiosInstance()).post(`msg/admin`, {
        adminId: 4,
        clientId: 2,
        message: body,
        title: title,
      });
    } catch (error) {
      return false;
    }
    props.toggle();
  };

  return (
    <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader>
        <div>Reply</div>
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Input plaintext name="title" value={`RE: ${props.title}`}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="body" className="talentTextAreaLabel">
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
            value="Reply"
            className="create-account-submit"
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};
