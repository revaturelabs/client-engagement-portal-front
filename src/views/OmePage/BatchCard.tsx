import React from 'react';
import { Batch, batchSkillToImage } from './types';
import { Col, Container, Row } from 'reactstrap';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/external-link-square.svg';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MatchTextComponent
  from '../../components/MatchTextComponent/MatchTextComponent';
import './batch-card.scss';

interface IBatchCardProps extends RouteComponentProps {
  /** the batch this card represents */
  batch: Batch;

  /** texts to highlight on the card */
  searchTexts: string[];
}

class BatchCard extends React.Component<IBatchCardProps, any> {
  static getDateLine = (b: Batch) => `${ b.startDate } to ${ b.endDate }`;

  static getTrainersLine = (b: Batch): string => b.employeeAssignments
      .map(e => `${ e.employee.firstName } ${ e.employee.lastName || '' }`)
      .join(', ');

  goToBatchPage = () => {
    this.props.history.push(`/batch/${ this.props.batch.batchId }`);
  };

  render() {
    const batch = this.props.batch;
    const imgSrc = batchSkillToImage[batch.skill];

    return (
        <Container className='batch-card'>
          <Row>
            <Col xs='7' sm='8' className='left'>
              <p className='name-line' onClick={ this.goToBatchPage }>
                <ExternalLinkIcon width={ 20 } height={ 20 }/>
                <MatchTextComponent
                    use='span'
                    needles={ this.props.searchTexts }
                    haystack={ batch.name }
                />
              </p>
              <MatchTextComponent
                  className='detail'
                  use='p'
                  needles={ this.props.searchTexts }
                  haystack={ batch.location }
              />
              <MatchTextComponent
                  className='detail'
                  use='p'
                  needles={ this.props.searchTexts }
                  haystack={ BatchCard.getTrainersLine(batch) }
              />
              <MatchTextComponent
                  className='detail date-line'
                  use='p'
                  needles={ this.props.searchTexts }
                  haystack={ BatchCard.getDateLine(batch) }
              />
            </Col>
            <Col className='right flex-column'>
              <div className='p-2'>
                <img src={ imgSrc } alt='skill logo'/>
              </div>
              <div className='bar-chart-wrapper mt-auto'>
                <BarChartIcon width={ 36 } height={ 36 }/>
              </div>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default withRouter(BatchCard);