import React from "react";
import { Provider } from 'react-redux';
import { PrivateAdminRoute } from "./PrivateAdminRoute";
import { mount } from "enzyme";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IUserState } from "../../_reducers/UserReducer";
import { MemoryRouter } from "react-router";

/**
 * Setup for Private Admin Route tests
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

describe('private-admin-route', () => {

    test('should render component if user has been authenticated as an admin', () => {

        user = {
            user: {
                email: "test@test.com",
                phone: "111-222-3333",
                role: "admin",
            }
        };

        store = mockStore({
            userState: {
                user: user.user
            }
        });

        PrivateComponent = () => <div>Private Component</div>;
        props = { path: '/admin', component: PrivateComponent };

        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[props.path]}>
                    <PrivateAdminRoute path={props.path} component={PrivateComponent} />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.exists(PrivateComponent)).toBe(true);

    });

    test('should redirect to login if user is not authenticated', () => {

        store = mockStore({
            userState: {
                user:  null
            }
        });

        PrivateComponent = () => <div>Private Component</div>;
        props = { path: '/admin', component: PrivateComponent };

        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[props.path]}>
                    <PrivateAdminRoute path={props.path} component={PrivateComponent} />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper.exists(PrivateComponent)).toBe(false);

    })

    test('should redirect to client page if user has been authenticated as a client', () => {

        store = mockStore({
            userState: {
                user: {
                    email: "test@test.com",
                    phone: "111-222-3333",
                    role: "client",
                }
            }
        });

        PrivateComponent = () => <div>Private Component</div>;
        props = { path: '/admin', component: PrivateComponent };

        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[props.path]}>
                    <PrivateAdminRoute path={props.path} component={PrivateComponent} />
                </MemoryRouter>
            </Provider>
        );

        const history: any = wrapper.find('Router').prop('history');
        expect(history.location.pathname).toBe('/home');

    });

});