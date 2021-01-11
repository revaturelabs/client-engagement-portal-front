import React, { useState } from 'react';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, ButtonDropdown } from 'reactstrap';
import logo from '../../assets/logo.png';
import '../../scss/navStyles.scss';
import { Turn as Hamburger } from 'hamburger-react'
// import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/UserActions';
import { IRootState } from '../../_reducers';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'


/**
 * @function NavBar
 * Displays the header on any page where a user is logged in.
 *
 * @param props contains the child components that are between the opening and closing NavBar tags.
 * Should consist only of drop-down options.
 */
export const NavBar: React.FC<any> = (props: any) => {
    const [navMenuOpen, setNavMenuOpen] = useState(false);
    const [hamOpen, setHamOpen] = useState(false);

    /**
     * @function toggle
     * toggles the dropdown menu and the orientation of the hamburger menu
     */
    const toggle = () => {
        setNavMenuOpen(!navMenuOpen)
        setHamOpen(!navMenuOpen);
    };

    const dispatch = useDispatch();

    let name = useSelector((state: IRootState) => {
        return `${state.userState.user?.firstName} ${state.userState.user?.lastName}`
    });
    name = (name === "undefined undefined") ? "Developer User" : name; // Placeholder for developer logins and (legacy) users without colloquial names

    /**
     * @function LogOut
     * De-authenticates the user session upon clicking the logout dropdown option.
     */
    const LogOut = () => {
        // Auth.signOut() // de-authenticates the user
        //     .catch(err => console.log(err));

        firebase.auth().signOut();
        dispatch(logout()); // clears the user data from the local state
    }

    let logoLink = "#";
    if (props.route) {
        logoLink = props.route;
    }

    return (
        <Row className="justify-content-around myNav">
            <Col xs="auto" className="justify-content-start logoContainer">
                <img id="revLogo" src={logo} className="myLogo" alt="revature logo" />
            </Col>
            <Col className="d-flex align-items-center justify-content-end auto test1" >
                <ButtonDropdown isOpen={navMenuOpen} toggle={toggle}>
                    {/* Mobile Hamburger Menu */}
                    <DropdownToggle id="navDropButton" style={{ margin: "10px", backgroundColor: "white", border: "none" }}>
                        <span className="myDropdown" id="usersName" style={{ margin: "5px", color: "#474C55", backgroundColor: "white", border: "none" }}>Welcome, {name} &#9660;</span>
                        <span className="myMobileDropdown">
                            <Hamburger hideOutline={true} toggled={hamOpen} toggle={setHamOpen} color="#474C55"></Hamburger>
                        </span>
                    </DropdownToggle>
                    {/* Desktop Menu */}
                    <DropdownMenu right>
                        {props.children}
                        <DropdownItem id="test-head" header>Account Options</DropdownItem>
                        <a href="/login"><DropdownItem onClick={LogOut}>Logout</DropdownItem></a>
                    </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </Row>
    )
}
