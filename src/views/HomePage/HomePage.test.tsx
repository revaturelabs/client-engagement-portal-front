import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BatchCard } from "../../components/BatchCard/BatchCard";
import HomePage from "./HomePage";
import renderer from 'react-test-renderer';
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
  
//const component = renderer.create(
//<Provider store={store} >
//<HomePage/>
//</Provider>
//);

//------------------
// Individual tests (unfinished)
//------------------

//testing the batch action
describe("authenticate setting the batch state", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  })
})
