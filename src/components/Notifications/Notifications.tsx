import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { IRootState } from '../../_reducers';
import { INotificationState } from '../../_reducers/NotificationReducer';
import './Notifications.scss';

/**
 * This component creates an Accordion element that is populated with the current notification state.
 * Once it reaches a certain height, an overflow attribute will trigger and turn the notifications into a scrollable box.
 *
 * @param props the current state of notifications
 *
 * @returns An Accordion element populated with all current requests for more Talent and desires to stage Interventions.
 */
const Notifications:React.FC<INotificationState> = (props:INotificationState) => {

    return (
        <Accordion className="notifs-container">
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id="notif-header">
                    Notifications
                </Accordion.Toggle>

                <div className="notifs">
                    {props.notifications?.map(
                            (e, i) =>
                            <Accordion.Collapse eventKey="0" key={i}>
                                <Table className="myTable" hover>
                                    <tbody>
                                        <tr className="notif-row">
                                            <td>{e.clientName}</td>
                                            <td>{e.subject}</td>
                                            <td>{e.requestDate}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Accordion.Collapse>
                        )
                    }
                </div>
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
