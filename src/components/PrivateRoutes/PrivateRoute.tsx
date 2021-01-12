import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { RootStateOrAny, useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component, ...rest }) => {

    const user = useSelector((state: RootStateOrAny) => state.userState.user);

    return (
        <Route
            {...rest}
            render={routeProps => 
                user ? <Component {...routeProps} /> : <Redirect to="/login" />
            }
        />
    );
}
