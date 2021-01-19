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
import { useSelector } from "react-redux";
import { IRootState } from "./../../_reducers/index";

export const ReplyModal: React.FC<IReplyModalProps> = (props) => {
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
    let recipient = (event.target as any).elements.recipient.value.slice(4);
    try {
      if (role === "admin") {
        (await axiosInstance()).post(`msg/admin`, {
          adminEmail: userEmail,
          clientEmail: recipient,
          message: body,
          title: title,
        });
      } else {
        (await axiosInstance()).post(`msg/client`, {
          adminEmail: recipient,
          clientEmail: userEmail,
          message: body,
          title: title,
        });
      }
    } catch (error) {
      console.log(error);
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
            <Input
              plaintext
              name="recipient"
              value={`To: ${props.recipient}`}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="body" className="talentTextAreaLabel">
              Body:
            </Label>
            <Input
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
            value="Reply"
            className="create-account-submit"
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};
