import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { Batch, batchSkillToImage, User } from '../../types';
import InterventionModal from '../PlanInterventionModal/PlanInterventionModalv2';
import mockDonutGraph from '../../assets/mock-donut-graph.png';
import '../../scss/batch-card-large.scss';
import DoughnutChart from '../Graphs/DoughnutChart';
import PercentageCircle from '../Graphs/PercentageCircle';

interface IBatchCardLargeProps {
  batch: Batch;
  user: User;
}

const BatchCardLarge: React.FC<IBatchCardLargeProps> = (props) => {
  const image = batchSkillToImage[props.batch.skill];
  const trainers = props.batch.employeeAssignments.map(e =>
      `${ e.employee.firstName } ${ e.employee.lastName }`).join(', ');

  return (
      <Card className='batch-info-card'>
        <CardHeader>
          <h4>{ props.batch.name }</h4>
        </CardHeader>
        <CardBody>
          <Row style={ { textAlign: 'center' } }>
            <Col md={ 12 } sm={ 12 }>
              <div className='logo-container'>
                <img src={ image } alt='Specialization logo'/>
                <br/>
              </div>
              <small>{ props.batch.skill }</small>
            </Col>
            {/* <Col md={ 6 } sm={ 12 }>
              <img
                  src={ mockDonutGraph } alt='donut graph'
                  style={ { width: '100px' } }
              />
              <br/>
              <small>Overall Batch Progress</small>
            </Col> */}
          </Row>
          <Row>
            <Col md={ 6 } sm={ 12 }>
              <DoughnutChart batch={props.batch}/>
            </Col>
            <Col md={ 6 } sm={ 12 }>  
              <PercentageCircle batch={props.batch}/>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col style={ { textAlign: 'center' } }>
              <Row>
                <Col md={ 6 } sm={ 12 }>
                  <small>
                    <b>Location: </b>
                    { props.batch.location }
                  </small>
                  <br/>
                </Col>
                <Col md={ 6 } sm={ 12 }>
                  <small>
                    <b>Trainer:</b> { trainers }
                  </small>
                  <br/>
                </Col>
              </Row>
              <Row>
                <Col md={ 6 } sm={ 12 }>
                  <small>
                    <b>Start Date: </b>
                    { props.batch.startDate }
                  </small>
                  <br/>
                </Col>
                <Col md={ 6 } sm={ 12 }>
                  <small>
                    <b>End Date: </b>
                    { props.batch.endDate }
                  </small>
                  <br/>
                </Col>
              </Row>
              <Row>
                <Col md={ 6 } sm={ 12 }>
                  <small>
                    <b>Batch Engineers: </b>
                    { props.batch.associateAssignments.length }
                  </small>
                </Col>
                <Col md={ 6 } sm={ 12 }>
                  <small>
                    <b>Current Week: </b>
                    { props.batch.currentWeek }
                  </small>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>

        {
          props.user.role === 'client' &&
          (
              <CardFooter> <InterventionModal/> </CardFooter>
          )
        }
      </Card>
  );
};

export default BatchCardLarge;