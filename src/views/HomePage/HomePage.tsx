/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { Batch, UserState } from '../../types';
import { getAdminBatches, getClientBatches } from '../../ajax';
import { RootStateOrAny, useSelector } from 'react-redux';
import 'firebase/auth';
import '../../scss/home-page.scss';
import { useHistory } from 'react-router';
import HomePageContent from './HomePageContent';
import LoadingPage from '../LoadingPage/LoadingPage';

/**
 * wrapper for HomePageContent. this ensures a user exists and
 * then waits to load batch data before rendering it in HomePageContent
 */
const HomePage: React.FC = () => {
  const [batches, setBatches] = useState<Batch[] | undefined>();
  const history = useHistory();

  // TODO we should not have to cast this
  const userObj = useSelector((state: RootStateOrAny) => state.userState as UserState);

  useEffect(() => {
    (async function() {
      const u = userObj.user;

      if (!u) {
        history.replace('/');
        return;
      }

      const unsorted = await
          (u.role === 'admin' ? getAdminBatches() : getClientBatches(u.email));

      // place batches ending furthest in the future first
      const sortedBatches = unsorted.sort((a, b) =>
          a.endDate === b.endDate ? 0 : a.endDate < b.endDate ? 1 : -1)

      setBatches(sortedBatches);
    })();
  }, []);

  return !batches || !userObj.user ? <LoadingPage/> :
      <HomePageContent batches={batches} user={userObj.user}/>;
}

export default HomePage;
