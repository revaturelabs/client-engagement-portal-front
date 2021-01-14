import { Batch } from '../OmePage/types';
import React from 'react';
import { Container, DropdownItem, Spinner } from 'reactstrap';
import { NavBar } from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import { BatchInformation } from '../../components/BatchInformation/BatchInformation';
import './batch-info-page.scss';

interface IBatchInfoPageContentProps {
  batch: Batch;
}

interface IBatchInfoPageState {

}

export default class BatchInfoPageContent
    extends React.Component<IBatchInfoPageContentProps, IBatchInfoPageState> {
  constructor(props: IBatchInfoPageContentProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <>
          <Container className='batch-info-page-content'>
            <NavBar>
              <Link to="/home">
                <DropdownItem>Return to Client Home</DropdownItem>
              </Link>
            </NavBar>
            <BatchInformation batch={this.props.batch} />
          </Container>
        </>
    );
  }
}