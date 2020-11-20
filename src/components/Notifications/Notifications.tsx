import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Table } from 'reactstrap';
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
export const Notifications:React.FC<INotificationState> = (props:INotificationState) => {

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
