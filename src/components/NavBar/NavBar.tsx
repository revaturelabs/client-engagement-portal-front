import React, { useState } from 'react';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, ButtonDropdown } from 'reactstrap';
import logo from '../../assets/logo.png';
import '../../scss/navStyles.scss';
import { Turn as Hamburger } from 'hamburger-react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/UserActions';
import { IRootState } from '../../_reducers';

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

    const hamToggle = () => setHamOpen(!hamOpen);
    const toggle = () => setNavMenuOpen(!navMenuOpen);

    const dispatch = useDispatch();

    let name = useSelector((state:IRootState) => {return state.userState.user?.firstName + " " + state.userState.user?.lastName});
    name = " " ? "Lorem Ipsum" : name; // Placeholder for developer logins and (legacy) users without colloquial names

    /**
     * @function LogOut
     * De-authenticates the user session upon clicking the logout dropdown option.
     */
    const LogOut = () => {
        Auth.signOut() // de-authenticates the user
        .then(data => console.log(data))
        .catch(err => console.log(err));
        
        dispatch(logout()); // clears the user data from the local state
    }

    return (
        <Row className="justify-content-around myNav">
            <Col xs="auto" className="justify-content-start logoContainer">
                <img src={logo} className="myLogo" alt="revature logo" />
            </Col>
            <Col className="d-flex align-items-center justify-content-end auto test1" >
                <ButtonDropdown isOpen={navMenuOpen} toggle={toggle}>
                    {/* Mobile Hamburger Menu */}
                    <DropdownToggle className="" style={{ margin: "10px", backgroundColor: "white", border: "none" }}>
                        <span className="myDropdown" style={{ margin: "5px", color: "#474C55", backgroundColor: "white", border: "none" }}>Welcome, {name} &#9660;</span>
                        <span className="myMobileDropdown">
                            <Hamburger toggled={hamOpen} toggle={hamToggle} color="#474C55"></Hamburger>
                        </span>
                    </DropdownToggle>
                    {/* Desktop Menu */}
                    <DropdownMenu right>
                        {props.children}
                        <DropdownItem header>Account Options</DropdownItem>
                        <Link to="/"><DropdownItem onClick={LogOut}>Logout</DropdownItem></Link>
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
