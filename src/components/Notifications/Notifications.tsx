import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { axiosInstance } from '../../util/axiosConfig';
import { IRootState } from '../../_reducers';
import { INotificationState } from '../../_reducers/NotificationReducer';
import { setNotifications } from '../../actions/NotificationActions';
import '../../scss/Notifications.scss';

/**
 * This component creates an Accordion element that is populated with the current notification state.
 * Once it reaches a certain height, an overflow attribute will trigger and turn the notifications into a scrollable box.
 *
 * @param props the current state of notifications
 *
 * @returns An Accordion element populated with all current requests for more Talent and desires to stage Interventions/Request more talent.
 */
const Notifications:React.FC<INotificationState> = (props:INotificationState) => {

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

    return (
        <Accordion className="notifs-container">
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id="notif-header">
                    Notifications
                </Accordion.Toggle>


                <Accordion.Collapse eventKey="0">
                        <div>
                            <Accordion className="notifs">
                                {props.notifications?.map(
                                        (e, i) =>
                                        <>
                                            <Accordion.Toggle as={Card.Header} variant="link" eventKey={i.toString()} id="notif-toggle">
                                                <div id="head">
                                                    <div id="companyName">{e.client.companyName}</div><div id="requestType">{e.requestType}</div><div id="dateCreated">{e.dateCreated}</div>
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey={i.toString()} key={i}>
                                                <div>
                                                    Status: {e.status}
                                                    <br/><br/>
                                                    {e.message}
                                                    <br/><br/>
                                                    Client Email: {e.client.email}
                                                    <br/>
                                                    Client Phone Number: {e.client.phoneNumber}
                                                </div>
                                            </Accordion.Collapse>
                                        </>
                                    )
                                }
                            </Accordion>
                        </div>
                    </Accordion.Collapse>
        </Accordion>
    )
}

/**
 * Gets the notification state to be mapped to the props for the Notification component.
 *
 * @param state current state that holds all other states
 */
const mapStateToProps = (state:IRootState) => {
    return {
        notifications: state.notificationState.notifications
    }
}

/**
 * Sends the current notification state to the Notification component.
 */
export default connect(mapStateToProps)(Notifications);
