import React from 'react';
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { RedirectWhenLoggedIn } from './redirectWhenLoggedIn';
import { Auth } from "aws-amplify";
import { Redirect } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createBrowserHistory, History } from "history";
import { Router } from "react-router";


configure({ adapter: new Adapter() });
/**
   * @Test
   * Default to the login page when no current user
   */
it("Default to /login when no user exists", async () => {
    //mock AWS Amplify Auth
    Auth.currentUserInfo = jest.fn().mockImplementation(() => {
        return null;
    });
    Auth.currentSession = jest.fn().mockImplementation(() => Promise.reject("No current user"));

    let wrapper: any;
    let history: History;
    history = createBrowserHistory();
    history.push("/");
    //Trigger useEffect on first render
    await act(async () => {
        wrapper = mount(
            <Router history={history}>
                <RedirectWhenLoggedIn />
            </Router>
        );
    });

    wrapper.update();
    wrapper.setProps({}); //trigger rerender
    expect(wrapper.find(Redirect).prop("to")).toBe('/login'); //should redirect to /login
});

/**
   * @Test
   * Reach component when admin role detected
   */

it("Go to /admin when no user has admin role", async () => {
    //mock AWS Amplify Auth
    Auth.currentUserInfo = jest.fn().mockImplementation(() =>
        Promise.resolve({ "attributes": { "custom:userRole": "admin" } })
    );
    Auth.currentSession = jest.fn().mockImplementation(() => Promise.resolve("User"));

    let wrapper: any;
    let history: History;
    history = createBrowserHistory();
    history.push("/");
    //Trigger useEffect on first render
    await act(async () => {
        wrapper = mount(
            <Router history={history}>
                <RedirectWhenLoggedIn />
            </Router>
        );
    });

    wrapper.update();
    wrapper.setProps({}); //trigger rerender
    expect(wrapper.find(Redirect).prop("to")).toBe('/admin'); //should redirect to /admin
});
/**
   * @Test
   * Reach component when client role detected
   */

it("Go to /home when no user has client role", async () => {
    //mock AWS Amplify Auth
    Auth.currentUserInfo = jest.fn().mockImplementation(() =>
        Promise.resolve({ "attributes": { "custom:userRole": "client" } })
    );
    Auth.currentSession = jest.fn().mockImplementation(() => Promise.resolve("User"));

    let wrapper: any;
    let history: History;
    history = createBrowserHistory();
    history.push("/");
    //Trigger useEffect on first render
    await act(async () => {
        wrapper = mount(
            <Router history={history}>
                <RedirectWhenLoggedIn />
            </Router>
        );
    });

    wrapper.update();
    wrapper.setProps({}); //trigger rerender
    expect(wrapper.find(Redirect).prop("to")).toBe('/home'); //should redirect to /home
});

