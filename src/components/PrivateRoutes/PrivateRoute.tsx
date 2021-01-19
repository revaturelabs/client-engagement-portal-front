import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { RootStateOrAny, useSelector } from 'react-redux';
import LoadingPage from '../../views/LoadingPage/LoadingPage';

/**
 * @author Daniel Mont-Eton
 * 
 * This component checks the redux store state to see if there is a current
 * user, and if there is it provides the private component or redirects the
 * user to the '/login' route.
 * 
 * @param component The private component which should not be accessed.
 * @param rest simply the rest of the props necessary to pass history, and
 * the path variables to the subsequent Route components.
 */
export const PrivateRoute = ({ component: Component, ...rest }: any) => {

    const user = useSelector((state: RootStateOrAny) => state.userState.user);

    // If no user exists show the loading page until the user is logged it
    // Should be refactored to be a loading value from redux store
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
