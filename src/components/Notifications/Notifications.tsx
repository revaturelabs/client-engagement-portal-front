import React, { SyntheticEvent } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Table } from 'reactstrap';
import { INotification } from '../../_reducers/NotificationReducer';
import './Notifications.scss';

//TODO: Add actions, styling

interface IProps {
    notifications:INotification[] | null
    addNotif: (cName:string, subj:string, date:string) => void;
    getNotifs: (cName:string, subj:string, date:string) => void;
    removeNotif: (cName:string, subj:string, date:string) => void;
}

export const Notifications:React.FC<IProps> = (props:IProps) => {

    const handleAdd = (e:SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.addNotif(e.currentTarget["n"].value, e.currentTarget["s"].value, e.currentTarget["d"].value);
    }

    return (
        <div className="notifs">
            {/*THIS FORM IS JUST TO TEST STATE*/}
            <form onSubmit={handleAdd}>
                <input type="text" name="n" placeholder="Client Name" defaultValue=""/>
                <input type="text" name="s" placeholder="Subject" defaultValue=""/>
                <input type="text" name="d" placeholder="Requested On" defaultValue=""/>
                <input type="submit" value="Submit"/>
            </form>

            <Accordion>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" id="notif-header">
                        Notifications
                    </Accordion.Toggle>
                    
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
            </Accordion>
        </div>
    )
}
