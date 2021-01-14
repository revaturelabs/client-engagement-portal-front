import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Batch } from '../OmePage/types';
import { getSingleBatch } from '../OmePage/api';
import LoadingPage  from '../LoadingPage/LoadingPage';
import BatchInfoPageContent from './BatchInfoPageContent';

interface IBatchInfoPageProps
    extends RouteComponentProps<{ batchId: string}> { }

interface IBatchInfoPageState {
  batch?: Batch;
}

class BatchInfoPage
    extends React.Component<IBatchInfoPageProps, IBatchInfoPageState> {
  constructor(props: IBatchInfoPageProps) {
    super(props);
    this.state = { };
  }

  componentDidMount = async () => {
    const batchId = this.props.match.params.batchId;
    const batch = await getSingleBatch(batchId);

    if (!batch) {
      alert(`couldn't load batch ${batchId} from api!`);
      return;
    }

    this.setState({ batch })
  }

  render() {
    const b = this.state.batch;
    return !b ? <LoadingPage/> : (
        <BatchInfoPageContent {...this.props} batch={b}/>
    )
  }
}

export default withRouter(BatchInfoPage);