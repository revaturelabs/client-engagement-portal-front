import { Batch } from '../../types';
import React from 'react';
import { Col, Container, DropdownItem, Row } from 'reactstrap';
import { NavBar } from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import '../../scss/batch-info-page-content.scss';
import { IUser } from '../../_reducers/UserReducer';
import BatchCardLarge from '../../components/BatchCardLarge/BatchCardLarge';
import { AssociateCard } from '../../components/AssociateCard/AssociateCard';

interface IBatchInfoPageContentProps {
  batch: Batch;
  user: IUser;
}

const BatchInfoPageContent: React.FC<IBatchInfoPageContentProps> = props => {
  return (
      <Container className='batch-info-page-content' fluid>
        <NavBar>
          <Link to='/home'>
            <DropdownItem>Home</DropdownItem>
          </Link>

          {
            props.user.role === 'admin' &&
            (
                <Link to='/admin'>
                  <DropdownItem>Map Clients</DropdownItem>
                </Link>
            )
          }
        </NavBar>
        <Row className='justify-content-center'>
          <Col sm='1'/>
          <Col sm='10' md='8' xl='5'>
            <div id='batch-info-wrapper'>
              <BatchCardLarge batch={ props.batch } user={props.user}/>
              {
                props.batch.associateAssignments.map((a, index) =>
                    ( <AssociateCard key={index} associateAssignment={a}/> )
                )
              }
            </div>
          </Col>
          <Col xs='1'/>
        </Row>
      </Container>
  );
};

export default BatchInfoPageContent;