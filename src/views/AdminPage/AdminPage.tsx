import React from "react";
import { Col, Container, Form, Input, Row } from "reactstrap";
import { BatchForms } from "../../components/BatchForms/BatchForms";
import { NavBar } from "../../components/NavBar/NavBar";
import { NewClientButton } from "../../components/NewClientButton/NewClientButton";

export const AdminPage: React.FC = () => {
<<<<<<< HEAD
    return (
        <>
            <Container
                style={{
                    minHeight: "100vh",
                    maxWidth: "100vw",
                    backgroundColor: "#E3E3E3",
                }}
            >
                <NavBar />
                <BatchForms />
=======

  
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
          <Col xs="3" className="text-left" style={{ marginTop: "50px" }}>
            <Form className="BatchForm">
              Map Batch To Client
              <Input type="select">
                <option>Select Client</option>
                <option>Dummy Client 1</option>
                <option>Dummy Client 2</option>
              </Input>
              <br />
              <Input type="select">
                <option>Select Batch</option>
                <option>Dummy Batch 1</option>
                <option>Dummy Batch 2</option>
              </Input>
              <Input className="BatchFormSubmit" type="submit">
                Submit
              </Input>
            </Form>
          </Col>
          <Col xs="3" className="text-right" style={{ marginTop: "50px" }}>
            <Form className="BatchForm">
              Unmap Batch From Client
              <Input type="select">
                <option>Select Client</option>
                <option>Dummy Client 1</option>
                <option>Dummy Client 2</option>
              </Input>
              <br />
              <Input type="select">
                Select Batch
                <option>Select Batch</option>
                <option>Dummy Batch 3</option>
                <option>Dummy Batch 4</option>
              </Input>
              <Input className="BatchFormSubmit" type="submit">
                Submit
              </Input>
            </Form>
          </Col>
          <Col xs="auto"></Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col xs="5" />
          <Col>
            <NewClientButton />
          </Col>
          <Col xs="5" />
        </Row>
        {/* <Row>
                Footer?
            </Row> */}
      </Container>
>>>>>>> b0029e68ba9f805b2e3d15bcbcde473bd02ed497

                <Row style={{ marginTop: "20px" }}>
                    <Col xs="5" />
                    <Col>
                        <NewClientButton />
                    </Col>
                    <Col xs="5" />
                </Row>
                {/* <Row>
                    Footer?
                </Row> */}
            </Container>

            {/* sticky footer */}
        </>
    );
};
