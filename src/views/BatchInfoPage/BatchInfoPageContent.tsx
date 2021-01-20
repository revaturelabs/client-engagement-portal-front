import { Batch } from '../../types';
import React from 'react';
import { Col, Container, DropdownItem, Row } from 'reactstrap';
import { NavBar } from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import '../../scss/batch-info-page-content.scss';
import { User } from '../../types';
import BatchCardLarge from '../../components/BatchCardLarge/BatchCardLarge';
import { AssociateCard } from '../../components/AssociateCard/AssociateCard';
import Notifications from '../../components/Notifications/Notifications';
import BatchAverageGraph from '../../components/Graphs/BatchAverageGraph';

interface IBatchInfoPageContentProps {
  batch: Batch;
  user: User;
}

const BatchInfoPageContent: React.FC<IBatchInfoPageContentProps> = (props) => {
  return (
    <Container className="batch-info-page-content" fluid>
      <NavBar>
        <Link to="/home">
          <DropdownItem>Home</DropdownItem>
        </Link>

        {props.user.role === "admin" && (
          <Link to="/admin">
            <DropdownItem>Map Clients</DropdownItem>
          </Link>
        )}
      </NavBar>
      <Row className="justify-content-center mt-2">
        <Col sm="1" />
        <Col sm="10" md="10" xl="10">
          <div id="batch-info-wrapper">
            <BatchCardLarge batch={props.batch} user={props.user} />
            <div
              className="batch-info-card"
              style={{ background: "white", marginTop: "10px", height: "30vh"}}
            >
              <BatchAverageGraph batch={props.batch}/>
            </div>
            <div>
              {
                props.batch.associateAssignments.map((a, index) =>
                    ( <AssociateCard key={index} traineeId={a.associate.grades[0].traineeId} batch={props.batch}/> )
                )
              }
              {
                props.user.role === 'admin' &&
                <Notifications/>
              }
            </div>
          </div>
        </Col>
        <Col xs="1" />
      </Row>
    </Container>
  );
};

export default BatchInfoPageContent;
