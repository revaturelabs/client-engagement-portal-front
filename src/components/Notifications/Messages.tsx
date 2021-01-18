import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { axiosInstance } from '../../util/axiosConfig';
import { IRootState } from '../../_reducers';
import { IMessageState } from '../../_reducers/MessagesReducer';
import { setMessages } from '../../actions/MessageActions';
import '../../scss/Notifications.scss';

const Messages:React.FC<IMessageState> = (props:IMessageState) => {

    const [requests, gotRequests] = useState(false);
    const dispatch = useDispatch();

   const getMessages = async () => {
       const response = await (await axiosInstance()).get("msg/");
       dispatch(setMessages(response.data));
       gotRequests(true);
   }

   if(!requests) {
       getMessages();
   }
   return(
    <>
    {props.messages?.map(
        (e, i) =>
        <>
            <div className="card border-dark">
                <div className="card-body">
                    <h5 className="message-title">Subject: placeholder</h5>

                    <div className="row">
                        <h6><div className='col-md'>Date: {e.dateSent}</div></h6>
                        <h6><div className='col-md'>Company Name: {e.client_Id.companyName}</div> </h6>
                        
                    </div>

                    <div className="row">
                        <p className="card-text col-md">{e.message}</p>
                        <div className="col-md">
                            <a href="#" className="btn btn-primary mr-2 float-right">reply</a> 
                            <a href="#" className="btn btn-primary mr-2 float-right">delete</a>
                        </div>
                    </div>
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
        messages: state.messageState.messages
    }
}

/**
 * Sends the current notification state to the Notification component.
 */
export default connect(mapStateToProps)(Messages);
