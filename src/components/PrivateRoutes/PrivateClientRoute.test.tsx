import React from "react";
import { Provider } from 'react-redux';
import { PrivateClientRoute } from "./PrivateClientRoute";
import { mount } from "enzyme";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IUserState } from "../../_reducers/UserReducer";
import { MemoryRouter } from "react-router";

/**
 * Setup for Private Client Route tests
 * 
 * Creating a wrapper component that is using the redux store
 * and the memory router to use route testing of dynamic rendering
 * on user state. Using history from memory router to check if 
 * the endpoint is the correct endpoint.
 * 
 * Known issue: when no user is logged in, redirects to loading page
 * on all unauthorized attempts to private routes.
 */

const mockStore = configureStore([thunk]);
let user: IUserState;
let store: any;
let PrivateComponent: any;
let props: any;
let wrapper: any;

describe('private-client-route', () => {

    test('should render component if user has been authenticated as a client', () => {

        user = {
            user: {
                email: "test@test.com",
                phone: "111-222-3333",
                role: "client",
            }
        }

        store = mockStore({
            userState: {
                user: user.user
            }
        });

        PrivateComponent = () => <div>Private Component</div>;
        props = { path: '/home', component: PrivateComponent };

        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[props.path]}>
                    <PrivateClientRoute path={props.path} component={PrivateComponent} />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.exists(PrivateComponent)).toBe(true);

    });

    test('should redirect to login if user is not authenticated', () => {

        store = mockStore({
            userState: {
                user: null
            }
        });

        PrivateComponent = () => <div>Private Component</div>;
        props = { path: '/home', component: PrivateComponent };

        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[props.path]}>
                    <PrivateClientRoute path={props.path} component={PrivateComponent} />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.exists(PrivateComponent)).toBe(false);

    });

    test('should redirect to admin page if user has been authenticated as an admin', () => {

        store = mockStore({
            userState: {
                user: {
                    email: "test@test.com",
                    phone: "111-222-3333",
                    role: "admin",
                }
            }
        });

        PrivateComponent = () => <div>Private Component</div>;
        props = { path: '/home', component: PrivateComponent };

        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[props.path]}>
                    <PrivateClientRoute path={props.path} component={PrivateComponent} />
                </MemoryRouter>
            </Provider>
        );

        const history: any = wrapper.find('Router').prop('history');
        expect(history.location.pathname).toBe('/admin');

    });

});