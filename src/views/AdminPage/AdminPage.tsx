import React, { useState } from "react";
import { Col, Container, DropdownItem, Row } from "reactstrap";
import { BatchForms } from "../../components/BatchForms/BatchForms";
import { NavBar } from "../../components/NavBar/NavBar";
import { NewClientButton } from "../../components/NewClientButton/NewClientButton";
import Notifications from "../../components/Notifications/Notifications";
import { Link } from "react-router-dom";

/**
 * @function AdminPage
 * Component showing the page that an admin sees when they log in.
 */
export const AdminPage: React.FC = () => {
  const [batchFormRerender, setBatchFormRerender] = useState<boolean>(false);

  return (
    <>
      <Container
        style={{
          minHeight: "100vh",
          maxWidth: "100vw",
          backgroundColor: "#E3E3E3",
        }}
      >
        <NavBar>
          <Link to="/home">
            <DropdownItem>Home</DropdownItem>
          </Link>
        </NavBar>

        <BatchForms
          rerender={batchFormRerender}
          doRerender={() => setBatchFormRerender(false)}
        />

        <Row className="justify-content-between mt-3">
          <Col xs="2" sm="3" md="4" lg="4" xl="5" />
          <Col
            className="justify-content-center"
            xs="8"
            sm="6"
            md="4"
            lg="4"
            xl="2"
          >
            <Row>
              <NewClientButton
                reloadClientDropdowns={() => setBatchFormRerender(true)}
              />
            </Row>
          </Col>
          <Col xs="2" sm="3" md="4" lg="4" xl="5" />
        </Row>
      </Container>
      <Notifications />
      {/* sticky footer */}
    </>
  );
};
