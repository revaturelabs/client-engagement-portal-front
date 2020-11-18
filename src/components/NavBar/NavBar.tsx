import React, { useState } from 'react';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import logo from '../../assets/logo.png';
import menuArrow from '../../assets/down-arrow.png';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export const NavBar: React.FC<any> = (props: any) => {
    const [navMenuOpen, setNavMenuOpen] = useState(false);

    const LogOut = () => {
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    return (
        <Row className="justify-content-around" style={{ height: "100px", backgroundColor: "white", borderBottom: "3px solid #F26925" }}>
            <Col xs="auto" className="justify-content-start">
                <img src={logo} alt="revature logo" style={{ marginTop: "15px" }} />
            </Col>
            <Col className="d-flex align-items-center justify-content-end auto" >
                Welcome, Lorem Ipsum
                <Dropdown isOpen={navMenuOpen} toggle={() => setNavMenuOpen(!navMenuOpen)}>
                    <DropdownToggle style={{ margin: "10px", backgroundColor: "white", border: "none" }}>
                        <img src={menuArrow} alt="dropdown menu arrow" height="20px" width="25px" />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <Link to="/"><DropdownItem onClick={LogOut}>Logout</DropdownItem></Link>
                        {props.children}
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </Row>
    )
}