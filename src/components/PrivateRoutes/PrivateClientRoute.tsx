import React from 'react';
import { Route, Redirect } from "react-router-dom";
import 'firebase/auth'
import { RootStateOrAny, useSelector } from 'react-redux';

export const PrivateClientRoute = ({ component: Component, ...rest }) => {

    const user = useSelector((state: RootStateOrAny) => state.userState.user);

    return (
        <Route
            {...rest}
            render={routeProps =>
                user ? user.role === "client" ? <Component {...routeProps} /> : <Redirect to="/admin" /> : <Redirect to="/login" />
            }
        />
    );

}
