import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import "./scss/app.scss";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginPage } from "./views/LoginPage/LoginPage";
import { HomePage } from "./views/HomePage/HomePage";
import { AdminPage } from "./views/AdminPage/AdminPage";
import { IRole } from "./_reducers/LoginReducer";
import { PageNotFound } from "./views/PageNotFound/PageNotFound";

Amplify.configure(awsconfig);

interface IProp {
    role: string | null;
}

function App(userInfo: IProp) {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => <Redirect to="/login" />}
                    />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/login-admin" />
                    {userInfo.role === "client" && (
                        <Route path="/home" component={HomePage} />
                    )}
                    {userInfo.role === "admin" && (
                        <Route path="/admin" component={AdminPage} />
                    )}
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = (appState: any) => {
    return {
        role: appState.roleState?.role,
    };
};

export default connect<IProp>(mapStateToProps)(App);
