import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { axiosInstance } from "../../util/axiosConfig";
import { IRootState } from "../../_reducers";
import { INotificationState } from "../../_reducers/NotificationReducer";
import { setNotifications } from "../../actions/NotificationActions";
import "../../scss/Notifications.scss";
import { ReplyMessageModal } from "./../MessagesModals/ReplyModal";

const Message: React.FC<INotificationState> = (props: INotificationState) => {
  const [requests, gotRequests] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const toggleReply = () => setShowReply(!showReply);
  const dispatch = useDispatch();

  const getNotifications = async () => {
    const response = await (await axiosInstance()).get("intervention/");
    dispatch(setNotifications(response.data));
    gotRequests(true);
  };

  if (!requests) {
    getNotifications();
  }
  return (
    <>
      {props.notifications?.map((e, i) => (
        <>
          <ReplyMessageModal
            show={showReply}
            toggle={toggleReply}
            title={e.requestType}
            recipient={e.client.email}
          />
          <div className="card border-dark">
            <div className="card-body">
              <h5 className="message-title">Subject: {e.requestType}</h5>
              <h6>
                <div className="col-md-5">
                  Company Name: {e.client.companyName}
                </div>
                <div className="col-md-7">Date: {e.dateCreated}</div>
              </h6>
              <p className="card-text">{e.message}</p>
              <button onClick={toggleReply} className="btn btn-primary mr-2">
                reply
              </button>
              <a href="#" className="btn btn-primary mr-2">
                delete
              </a>
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
    notifications: state.notificationState.notifications,
  };
};

/**
 * Sends the current notification state to the Notification component.
 */
export default connect(mapStateToProps)(Message);
