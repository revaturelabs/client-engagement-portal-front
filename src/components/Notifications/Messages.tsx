import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { axiosInstance } from "../../util/axiosConfig";
import { IRootState } from "../../_reducers";
import { IMessageState } from "../../_reducers/MessagesReducer";
import { setMessages } from "../../actions/MessageActions";
import "../../scss/Notifications.scss";
import { useSelector } from "react-redux";
import { ReplyModal } from "./../MessagesModals/ReplyModal";
import "../../scss/Messages.scss";
import { resolveModuleNameFromCache } from "typescript";
import { render } from "enzyme";

const Messages: React.FC<IMessageState> = (props: IMessageState) => {
  const [showReply, setShowReply] = useState(false);
  const toggleReply = () => setShowReply(!showReply);
  const [requests, gotRequests] = useState(false);
  const dispatch = useDispatch();

  let userEmail = useSelector((state: IRootState) => {
    var email = `${state.userState.user?.email}`;
    return email;
  });

  let role = useSelector((state: IRootState) => {
    return `${state.userState.user?.role}`;
  });

  const getMessages = async () => {
    var URL = getUrl();
    const response = await (await axiosInstance()).get(URL);
    dispatch(setMessages(response.data));
    gotRequests(true);
  };

  const deleteMessage = async (messageID: number) => {
    try {
      (await axiosInstance()).delete(`msg/` + messageID);
    } catch (error) {
      return false;
    }
  };

  const getUrl = () => {
    const URL = role === "admin" ? "msg" : "message/" + userEmail;
    return URL;
  };

  function sender(isAdmin: boolean, adminEmail: string, clientEmail: string) {
    if (isAdmin) {
      return adminEmail;
    } else {
      return clientEmail;
    }
  }

  if (!requests) {
    getMessages();
  }
  return (
    <>
      {props.messages?.map((e, i) => (
        <>
          <ReplyModal
            show={showReply}
            toggle={() => toggleReply()}
            title={e.title}
            recipient={role === "admin" ? e.clientId.email : "admin"}
          />
          <div className="card border-dark">
            <div className="card-body">
              <h5 className="message-title">{e.title}</h5>
              <h5 className="message-title">
                Sender:{" "}
                {sender(
                  e.adminTheSender,
                  e.adminId === null ? "admin" : e.adminId.email,
                  e.clientId.email
                )}
              </h5>

              <div className="row">
                <h6>
                  <div className="col-md">Date: {e.dateSent}</div>
                </h6>
                <h6>
                  <div className="col-md">
                    Company Name: {e.clientId.companyName}
                  </div>{" "}
                </h6>
              </div>

              <div className="row">
                <p className="card-text col-md">{e.message}</p>
                <div className="col-md">
                  {sender(
                    e.adminTheSender,
                    e.adminId === null ? "admin" : e.adminId.email,
                    e.clientId.email
                  ) !== userEmail && (
                    <button
                      onClick={toggleReply}
                      className="btn btn-primary mr-2 float-right"
                    >
                      Reply
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(e.messageId)}
                    className="btn btn-primary mr-2 float-right"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br></br>
        </>
      ))}
    </>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    messages: state.messageState.messages,
  };
};

/**
 * Sends the current notification state to the Notification component.
 */
export default connect(mapStateToProps)(Messages);
