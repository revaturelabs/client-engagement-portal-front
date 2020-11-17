import React from 'react';
import { Accordion, AccordionCollapse, Button, Card, Table } from 'react-bootstrap';
import { INotification, INotificationState } from '../../_reducers/NotificationReducer';

//TODO: Add props, reducer, actions, styling

export const Notifications:React.FC<INotificationState> = (props:INotificationState) => {

    // <Accordion.Collapse eventKey="0">
    //                 <Card.Body>
    //                     <Table>
    //                         <tbody>
    //                             <tr>
    //                                 <td>clientName1</td>
    //                                 <td>subject1</td>
    //                                 <td>requestDate1</td>
    //                             </tr>
    //                         </tbody>
    //                     </Table>
    //                 </Card.Body>
    //             </Accordion.Collapse>

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                        Notifications
                    </Accordion.Toggle>
                </Card.Header>
                
                {props.notifications?.map(
                        (e, i) =>
                        <Accordion.Collapse eventKey="0" key={i}>
                            <Card.Body>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>{e.clientName}</td>
                                            <td>{e.subject}</td>
                                            <td>{e.requestDate}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Accordion.Collapse>
                    )
                
                }
            </Card>
        </Accordion>
    )
}