import { configure, mount } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import RouterGuard from "../../components/RouterGuard/RouterGuard";
import { Router } from "react-router";
import { createBrowserHistory, History, State } from "history";
import { Auth } from "aws-amplify";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

//Dumby Component so that we aren't accidentally testing every other component
const dumbyComponent: React.FC = () => {
  return <div>{"I'm a dumbyComponent"}</div>;
};

describe("RouterGuard", () => {
  let history: History<State>;
  beforeEach(() => {
    //Allow Route testing
    history = createBrowserHistory();
    history.push("/admin");
  });

  /**
   * @Test
   * We can reach the component only if we have the right role given by AWS Cognito
   */
  it("Can access page if correct role", async () => {
    //mock AWS Amplify Auth
    Auth.currentUserInfo = jest.fn().mockImplementation(() => {
      return {
        attributes: {
          "custom:userRole": "admin",
        },
      };
    });

    let wrapper: any;
    //Trigger useEffect on first render
    await act(async () => {
      wrapper = mount(
        <Router history={history}>
          <RouterGuard component={dumbyComponent} redirectPath="/" path="/admin" role={["admin"]} />
        </Router>
      );
    });
    wrapper.update();
    wrapper.setProps({}); //trigger rerender
    // console.log(wrapper.debug());
    expect(wrapper.find(dumbyComponent)).toHaveLength(1);
  });

  /**
   * @Test
   * We can't reach the component if we aren't signed in
   */
  it("Can't access page if not signed in", async () => {
    //mock AWS Amplify Auth
    Auth.currentUserInfo = jest.fn().mockImplementation(() => {
      return {
        attributes: {
          "custom:userRole": "client",
        },
      };
    });

    let wrapper: any;
    //Trigger useEffect on first render
    await act(async () => {
      wrapper = mount(
        <Router history={history}>
          <RouterGuard component={dumbyComponent} redirectPath="/" path="/admin" role={["admin"]} />
        </Router>
      );
    });

    wrapper.update();
    wrapper.setProps({}); //trigger rerender
    expect(wrapper.find(dumbyComponent)).toHaveLength(0); //shouldn't render
  });

  /**
   * @Test
   * We can't reach component if we have the wrong role
   */
  it("Can't access page if wrong role", async () => {
    //mock AWS Amplify Auth
    Auth.currentUserInfo = jest.fn().mockImplementation(() => {
      return null;
    });

    let wrapper: any;
    //Trigger useEffect on first render
    await act(async () => {
      wrapper = mount(
        <Router history={history}>
          <RouterGuard component={dumbyComponent} redirectPath="/" path="/admin" role={["admin"]} />
        </Router>
      );
    });

    wrapper.update();
    wrapper.setProps({}); //trigger rerender
    expect(wrapper.find(dumbyComponent)).toHaveLength(0); //shouldn't render
  });
});
