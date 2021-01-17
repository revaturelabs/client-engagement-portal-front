/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Batch } from '../../util/viewInfoSquadDummyTypes';
import { getSingleBatch } from '../../util/viewInfoSquadDummyApi';
import LoadingPage  from '../LoadingPage/LoadingPage';
import BatchInfoPageContent from './BatchInfoPageContent';
import { IUserState } from "../../_reducers/UserReducer";
import { useHistory } from 'react-router';

interface IBatchInfoPageProps
    extends RouteComponentProps<{ batchId: string}> { }

const BatchInfoPage: React.FC<IBatchInfoPageProps> = props => {
  const [batch, setBatch] = useState<Batch | undefined>();
  const history = useHistory();

  // TODO we should not have to cast this
  const userObj: IUserState = useSelector((state: RootStateOrAny) => state.userState as IUserState)

  useEffect(() => {
    (async () => {
      const u = userObj.user;

      if (!u) {
        history.replace('/');
        return;
      }

      const batchId = props.match.params.batchId;
      const ret = await getSingleBatch(batchId);

      if (!ret) {
        // TODO route to a 404 page
        alert(`couldn't load batch ${batchId} from api!`);
        return;
      }

      setBatch(ret);
    })();
  }, []);

  return !batch || !userObj.user ? <LoadingPage/> :
      <BatchInfoPageContent batch={batch} user={userObj.user}/>;
}

/**
 * wrapper for BatchInfoPageContent. this ensures a user exists and
 * then waits to load batch data before rendering it in BatchInfoPageContent
 */
export default withRouter(BatchInfoPage);