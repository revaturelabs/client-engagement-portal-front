import React from 'react';
import { Route, Redirect } from "react-router-dom";
import 'firebase/auth'
import { RootStateOrAny, useSelector } from 'react-redux';
import LoadingPage from '../../views/LoadingPage/LoadingPage';

export const PrivateAdminRoute = ({ component: Component, ...rest }:any) => {

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
                user ? user.role === "admin" ? <Component {...routeProps} /> : <Redirect to="/home" /> : <Redirect to="/login" />
            }
        />
    );

}