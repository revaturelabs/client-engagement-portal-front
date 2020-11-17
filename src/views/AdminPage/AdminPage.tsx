import React from "react";
import { Col, Container, Row } from "reactstrap";
import { NavBar } from "../../components/NavBar/NavBar";
import { NewClientButton } from "../../components/NewClientButton/NewClientButton";

export const AdminPage: React.FC = () => {
  return (
    <>
      <Container
        style={{
          height: "100vh",
          maxWidth: "100vw",
          backgroundColor: "#B9B9BA",
        }}
      >
        <NavBar />
        <Row className="justify-content-between">
          <Col xs="auto"></Col>
          <Col xs="8" className="text-left" style={{ marginTop: "50px" }}>
            {/*

                    Page content
                    
                    */}
          </Col>
          <Col xs="auto"></Col>
        </Row>
        {/* <Row>
                Footer?
            </Row> */}
      </Container>
      <NewClientButton />
      {/* sticky footer */}
    </>
  );
};
