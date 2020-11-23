import React, { useState } from 'react';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, ButtonDropdown } from 'reactstrap';
import logo from '../../assets/logo.png';
import '../../scss/navStyles.scss';
import { Turn as Hamburger } from 'hamburger-react'
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
// interface INavBarProps{
//     dropDownProps?:React.ComponentType<DropdownItem>[];
// }

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

    /**
     * @function LogOut
     * De-authenticates the user session upon clicking the logout dropdown option.
     */
    const LogOut = () => {
        Auth.signOut()
            .then(data => data)
            .catch(err => err);
    }
    let logoLink = "#";
    if (props.route) {
        logoLink = props.route;
    }

    return (
        <Row className="justify-content-around myNav">
            <Col xs="auto" className="justify-content-start logoContainer">
                <Link to={logoLink}>
                    <img src={logo} className="myLogo" alt="revature logo" /></Link>
            </Col>
            <Col className="d-flex align-items-center justify-content-end auto test1" >
                <ButtonDropdown isOpen={navMenuOpen} toggle={toggle}>
                    {/* Mobile Hamburger Menu */}
                    <DropdownToggle className="" style={{ margin: "10px", backgroundColor: "white", border: "none" }}>
                        <span className="myDropdown" style={{ margin: "5px", color: "#474C55", backgroundColor: "white", border: "none" }}>Welcome, Lorem Ipsum &#9660;</span>
                        <span className="myMobileDropdown">
                            <Hamburger hideOutline={true} toggled={hamOpen} toggle={setHamOpen} color="#474C55"></Hamburger>
                        </span>
                    </DropdownToggle>
                    {/* Desktop Menu */}
                    <DropdownMenu right>
                        {props.children}
                        <DropdownItem header>Account Options</DropdownItem>
                        <Link to="/login"><DropdownItem onClick={LogOut}>Logout</DropdownItem></Link>
                    </DropdownMenu>
                </ButtonDropdown>
            </Col>
            {/*
            <Col className="d-flex align-items-center justify-content-end auto" id="myMobileDropdown" >
                <Dropdown isOpen={navMenuOpen} toggle={toggle}>

                    <DropdownMenu right>
                        <a href="/"><DropdownItem>Logout</DropdownItem></a>
                    </DropdownMenu>
                </Dropdown>
            </Col> */}
        </Row>
    )
}
