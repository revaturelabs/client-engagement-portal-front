import React from 'react';
import logo from '../../assets/logo.png';
import { NavBar } from "../../components/NavBar/NavBar";
import { Container, DropdownItem, Spinner } from 'reactstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Notifications from "../../components/Notifications/Notifications";
import Message from "../../components/Notifications/Message";

export const MessagesPage: React.FC = () => {
    return (
        <>

        <Container style={{ minHeight: "100vh", maxWidth: "100vw", backgroundColor: "#E3E3E3" }}>
            
        <NavBar>
            <Link to="/home">
                <DropdownItem>Return to Client Home</DropdownItem>
            </Link>
        </NavBar>
        
        <br></br>
        <a href="#" className="btn btn-primary mr-2">new message</a>
        <br></br>

        <Message></Message>
        
        </Container>
        <Notifications></Notifications>
        
        </>
        );
}
