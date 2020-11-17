import React, { SyntheticEvent } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Table } from 'reactstrap';
import { INotificationState } from '../../_reducers/NotificationReducer';
import './Notifications.scss';
import { INotificationActions } from './NotificationsContainer';

//TODO: Add actions, styling

interface IStateAndActions {
    state: INotificationState
    actions: INotificationActions
}

export const Notifications:React.FC<IStateAndActions> = (props:IStateAndActions) => {

    const handleAdd = (e:SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        
    }

    return (
        <div>
            {/*THIS FORM IS JUST TO TEST STATE*/}
            <form onSubmit={handleAdd}>
                <input type="text" placeholder="Client Name" defaultValue=""/>
                <input type="text" placeholder="Subject" defaultValue=""/>
                <input type="text" placeholder="Requested On" defaultValue=""/>
                <input type="submit" value="Submit"/>
            </form>

            <Accordion defaultActiveKey="0">
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id="notif-header">
                        Notifications
                    </Accordion.Toggle>
                    
                    {props.state.notifications?.map(
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
            </Accordion>
        </div>
    )
}