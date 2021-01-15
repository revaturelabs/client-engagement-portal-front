import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { RootStateOrAny, useSelector } from 'react-redux';
import LoadingPage from '../../views/LoadingPage/LoadingPage';

/**
 * @author Daniel Mont-Eton
 * 
 * This component checks the redux store state to see if there is a current
 * user, and if there is it provides the private component or redirects the
 * user to the '/login' route. If there is a current user in the redux store
 * AND they are an admin then they are provided the private component.
 * 
 * If their role is client however, then they will be redirected to /client.
 * 
 * @param component The private component which should not be accessed.
 * @param rest simply the rest of the props necessary to pass history, and
 * the path variables to the subsequent Route components.
 */
export const PrivateAdminRoute = ({ component: Component, ...rest }: any) => {

  const user = useSelector((state: RootStateOrAny) => state.userState.user);

  // If no user exists show the loading page until the user is logged it
  // Should be refactored to be a loading value from redux store
  if (!user) {
    return (
      <Route
        {...rest}
        render={() => {
          return <LoadingPage />;
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={routeProps =>
        user ? user.role === "admin" ? <Component {...routeProps} /> : <Redirect to="/home" /> : <Redirect to="/login" />
      }
    />
  );

}