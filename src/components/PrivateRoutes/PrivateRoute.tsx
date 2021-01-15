import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { RootStateOrAny, useSelector } from 'react-redux';
import LoadingPage from '../../views/LoadingPage/LoadingPage';

export const PrivateRoute = ({ component: Component, ...rest }: any) => {

    const user = useSelector((state: RootStateOrAny) => state.userState.user);

    if (!user) {
        return (
            <Route
              {...rest}
              render={() => {
                return <LoadingPage/>;
              }}
            />
          );
    }

    return (
        <Route
            {...rest}
            render={routeProps => 
                user ? <Component {...routeProps} /> : <Redirect to="/login" />
            }
        />
    );
}
