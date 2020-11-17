import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Table } from 'reactstrap';
import { INotificationState } from '../../_reducers/NotificationReducer';
import './Notifications.scss';

//TODO: Add actions, styling

export const Notifications:React.FC<INotificationState> = (props:INotificationState) => {

    return (
        <Accordion defaultActiveKey="0">
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id="notif-header">
                    Notifications
                </Accordion.Toggle>
                
                {props.notifications?.map(
                        (e, i) =>
                        <Accordion.Collapse eventKey="0" key={i}>
                            <Table className="myTable">
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
        </Accordion>
    )
}