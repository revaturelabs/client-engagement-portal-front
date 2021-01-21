import React from "react";
import { Provider } from "react-redux";
import { PrivateRoute } from "./PrivateRoute";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";
import { UserState } from "../../types";

/**
 * Setup for Private Route tests
 *
 * Creating a wrapper component that is using the redux store
 * and the memory router to use route testing of dynamic rendering
 * on user state.
 */

const mockStore = configureStore([thunk]);
let user: UserState;
let store: any;
let PrivateComponent: any;
let props: any;
let wrapper: any;

describe("private-route", () => {
  test("should render component if user has been authenticated", () => {
    user = {
      user: {
        email: "test@test.com",
        phone: "111-222-3333",
        role: "client",
      },
    };

    store = mockStore({
      userState: {
        user: user.user,
      },
    });

    PrivateComponent = () => <div>Private Component</div>;
    props = { path: "/home", component: PrivateComponent };

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[props.path]}>
          <PrivateRoute path={props.path} component={PrivateComponent} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.exists(PrivateComponent)).toBe(true);
  });

  test("should redirect to login if user is not authenticated", () => {
    store = mockStore({
      userState: {
        user: null,
      },
    });

    PrivateComponent = () => <div>Private Component</div>;
    props = { path: "/home", component: PrivateComponent };

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[props.path]}>
          <PrivateRoute path={props.path} component={PrivateComponent} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.exists(PrivateComponent)).toBe(false);
  });
});
