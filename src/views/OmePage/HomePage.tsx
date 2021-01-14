import React, { ChangeEvent } from 'react';
import { Batch } from './types';
import { getDummyBatches } from './api';
import { Col, Container, Row } from 'reactstrap';
import { NavBar } from '../../components/NavBar/NavBar';
import BatchCard from './BatchCard';
import './home-page.scss';

interface IHomePageState {
  batches: Batch[];
  hiddenBatchIds: Set<string>;
  searchText: string;
  searchTexts: string[];
}

// TODO loading stuff
export default class HomePage extends React.Component<any, IHomePageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      batches: [],
      hiddenBatchIds: new Set<string>(),
      searchText: '',
      searchTexts: []
    };
  }

  componentDidMount = async () => {
    // show batches that finish furthest in the future first
    const batches = (await getDummyBatches()).sort((a, b) =>
        a.endDate === b.endDate ? 0 : a.endDate < b.endDate ? 1 : -1)
    this.setState({ batches });
  };

  private onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    this.setState({
      searchText,
      searchTexts: searchText.trim().split('`')
          .map(s => s.trim().toLowerCase()).filter(s => !!s)
    }, this.updateHiddenBatchIds);
  }

  private updateHiddenBatchIds = () => {
    const needles = this.state.searchTexts;
    const hiddenBatchIds = new Set<string>();

    // determine which batches should be hidden
    for (const b of this.state.batches) {
      const wc = BatchCard.WrappedComponent;
      const haystacks: string[] = [
        b.name.toLowerCase(),
        b.location.toLowerCase(),
        wc.getTrainersLine(b).toLowerCase(),
        wc.getDateLine(b).toLowerCase()
      ];

      let foundMatch = true;

      // each needle must be found in at least one of the haystacks
      for (let i = 0; foundMatch && (i < needles.length); i++) {
        const needle = needles[i];
        if (!haystacks.map(h => h.includes(needle)).includes(true)) {
          foundMatch = false;
          hiddenBatchIds.add(b.batchId);
        }
      }
    }

    this.setState({ hiddenBatchIds });
  }

  render() {
    return (
        <Container className='home-page' >
          <NavBar/>
          <Row className='justify-content-between'>
            <Col md='auto'/>
            <Col className='text-left center-column' md='8' lg='7' xl='5'>
              <input
                  value={this.state.searchText}
                  onChange={this.onInputChange}
                  placeholder='new york`349'
              />
              {
                this.state.batches
                .filter(b => !this.state.hiddenBatchIds.has(b.batchId))
                .map((batch, index) => (
                    <BatchCard
                        key={ index }
                        batch={ batch }
                        searchTexts={ this.state.searchTexts }
                    />
                ))
              }
            </Col>
            <Col md='auto'/>
          </Row>
        </Container>
    );
  }
}