import React, { useState } from "react";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  ButtonDropdown,
} from "reactstrap";
import logo from "../../assets/logo.png";
import "../../scss/navStyles.scss";
import { Turn as Hamburger } from "hamburger-react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/UserActions";
import firebase from "firebase/app";
import "firebase/auth";
import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();
  /**
   * @function toggle
   * toggles the dropdown menu and the orientation of the hamburger menu
   */
  const toggle = () => {
    setNavMenuOpen(!navMenuOpen);
    setHamOpen(!navMenuOpen);
  };

  const dispatch = useDispatch();

  const user = useSelector((state: RootStateOrAny) => state.userState.user);
  const name = user
    ? user.role === "admin"
      ? `${user.firstName} ${user.lastName}`
      : user.companyName
    : "";

  /**
   * @function LogOut
   * De-authenticates the user session upon clicking the logout dropdown option.
   */
  const LogOut = () => {
    firebase.auth().signOut();
    dispatch(logout()); // clears the user data from the local state
  };

  // let logoLink = "#";
  // if (props.route) {
  //     logoLink = props.route;
  // }
  const navigateToMessages = () => {
    history.push("/messages");
  };

  return (
    <Row className="justify-content-around myNav">
      <Col xs="auto" className="justify-content-start logoContainer">
        <img id="revLogo" src={logo} className="myLogo" alt="revature logo" />
      </Col>

      <Col className="d-flex align-items-center justify-content-end auto test1">
        {/* <Link to={"/messages"}> */}
        {/* <a href="/messages" className="btn btn-primary mr-2">
          Messages
        </a> */}
        {/* </Link> */}
        <button className="btn btn-primary mr-2" onClick={navigateToMessages}>
          Messages
        </button>
        <ButtonDropdown isOpen={navMenuOpen} toggle={toggle}>
          {/* Mobile Hamburger Menu */}
          <DropdownToggle
            id="navDropButton"
            style={{ margin: "10px", backgroundColor: "white", border: "none" }}
          >
            <span
              className="myDropdown"
              id="usersName"
              style={{
                margin: "5px",
                color: "#474C55",
                backgroundColor: "white",
                border: "none",
              }}
            >
              Welcome {name} &#9660;
            </span>
            <span className="myMobileDropdown">
              <Hamburger
                hideOutline={true}
                toggled={hamOpen}
                toggle={setHamOpen}
                color="#474C55"
              ></Hamburger>
            </span>
          </DropdownToggle>
          {/* Desktop Menu */}
          <DropdownMenu right>
            {props.children}
            <DropdownItem id="test-head" header>
              Account Options
            </DropdownItem>
            <a href="/login">
              <DropdownItem onClick={LogOut}>Logout</DropdownItem>
            </a>
          </DropdownMenu>
        </ButtonDropdown>
      </Col>
    </Row>
  );
};
