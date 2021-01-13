import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { axiosInstance } from '../../util/axiosConfig';
import { IRootState } from '../../_reducers';
import { INotificationState } from '../../_reducers/NotificationReducer';
import { setNotifications } from '../../actions/NotificationActions';
import '../../scss/Notifications.scss';

const Message:React.FC<INotificationState> = (props:INotificationState) => {

   const [requests, gotRequests] = useState(false);
   const dispatch = useDispatch();

   const getNotifications = async () => {
       const response = await (await axiosInstance()).get("intervention/");
       dispatch(setNotifications(response.data));
       gotRequests(true);
   }

   if(!requests) {
       getNotifications();
   }
   return(
    <>
    {props.notifications?.map(
        (e, i) =>
        <>
            <div className="card border-dark">
                <div className="card-body">
                    <h5 className="message-title">Subject: {e.requestType}</h5>
                    <h6>
                        <div className="col-md-5">Company Name: {e.client.companyName}</div>
                        <div className="col-md-7">Date: {e.dateCreated}</div>
                    </h6>
                    <p className="card-text">{e.message}</p>
                    <a href="#" className="btn btn-primary mr-2">reply</a> 

                    <a href="#" className="btn btn-primary mr-2">delete</a>
                </div>
            </div>
            <br></br>
        </>        
    )}
    </>
   )
}

const mapStateToProps = (state:IRootState) => {
    return {
        notifications: state.notificationState.notifications
    }
}

/**
 * Sends the current notification state to the Notification component.
 */
export default connect(mapStateToProps)(Message);
