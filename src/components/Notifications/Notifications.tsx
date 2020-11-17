import React from 'react';
import { Accordion, AccordionCollapse, Button, Card } from 'react-bootstrap';

//basic structure of the notifications
export interface INotification {
    clientName:string
    subject:string
    requestDate:Date
}

//state of the notifications
export interface INotificationState {
    notifications:INotification[]
}

//TODO: Add props, reducer, actions, styling

export const Notifications:React.FC/*<INotificationState>*/ = (/*props:INotificationState*/) => {

    

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                        Open
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Body 1</Card.Body>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Body 2</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}