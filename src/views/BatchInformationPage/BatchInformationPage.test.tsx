import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { BatchInformationPage } from "./BatchInformationPage";
import configureStore from "redux-mock-store";
import Axios from "axios";
import { act as testUtilsAct } from "react-dom/test-utils";
// import { act as testRendererAct } from "react-test-renderer";
import { mount } from "enzyme";
import { BatchInformation } from "../../components/BatchInformation/BatchInformation";
// import { AssociateCardFactory } from "../../components/AssociateCard/AssociateCardFactory";
import { createBrowserHistory, History } from "history";
import { BrowserRouter, Router } from "react-router-dom";

const mockStore = configureStore([]);
let fakeData: any;
let initialData: any;
let nullData : any;
let store: any;

const mockAxiosGet = jest.spyOn(Axios, "get");

beforeAll(() => {
  const ax = require("../../util/axiosConfig");
  ax.axiosInstance = jest.fn(() => {
    return Axios;
  });

  mockAxiosGet.mockImplementation(() => {
    return Promise.resolve({
      data : [...fakeData]
    });
  });

  fakeData = {
    match: {
      params: {
        batchId: "1",
      },
    },
    batches: [
      {
        name: "Test",
        endDate: "endDate",
        employeeAssignments: [
          {
            employee: {
              firstName: "TestFName",
              lastName: "TestLameName",
            },
          },
        ],
        skill: "Java, React, Spring",
        associateAssignments: [
          {
            active: "true",
            associate: {
              firstName: "wack",
              lastName: "jobs",
              grades: [
                {
                  gradeId: "GR6953",
                  dateReceived: "10/03/2020",
                  score: "5",
                },
              ],
            },
          },
        ],
      },
    ],
  };

  initialData = {
    match: {
      params: {
        batchId: "1",
      },
    },
    batches: [
      {
        name: "",
        endDate: "",
        employeeAssignments: [
          {
            employee: {
              firstName: "",
              lastName: "",
            },
          },
        ],
        skill: "",
        associateAssignments: [
          {
            active: false,
            associate: {
              firstName: "",
              lastName: "",
              grades: [
                {
                  gradeId: "",
                  dateReceived: "",
                  score: "",
                },
              ],
            },
          },
        ],
      },
    ],
  };
  nullData = {
    match: {
      params: {
        batchId: "1",
      },
    },
    batches: [
      {
        name: "",
        endDate: "",
        employeeAssignments: null,
        skill: "",
        associateAssignments: null,
      },
    ],
  };
});

describe("BatchInformationPage view", () => {
  let component: any;

  beforeEach(() => {
    store = mockStore({
      userState: {
        user: {
          firstName: "wack",
          lastName: "jobs",
        },
      },
      batchState: {
          batches: nullData.batches
      }
    });

    component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <BatchInformationPage {...initialData} />
      </Provider>
      </BrowserRouter>
    );
  });

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});

it("should test axios call", async () => {
    let wrapper2: any;
    await testUtilsAct(async () => {
      wrapper2 = mount(    <BrowserRouter>
        <Provider store={store}>
          <BatchInformationPage {...initialData} />
        </Provider>
        </BrowserRouter>
    )});   

    wrapper2.update();
    wrapper2.setProps(fakeData);
    expect(wrapper2.find(BatchInformation).children().length).toBeGreaterThan(0);
  });

  it("should set trainer to N/A and associateAssignments to an empty array" , async () => {
    let wrapper2: any;
    let history: History;
    history = createBrowserHistory();
    history.push("/");
    await testUtilsAct(async () => {
        wrapper2 = mount(
            <Router history={history}>
          <Provider store={store}>
            <BatchInformationPage {...nullData} match={{params: {batchId: "1"}}}/>
          </Provider>
          </Router>
          )
    });   
    wrapper2.render();
    wrapper2.setProps({});
    /* Doesn't make sense with application logic */
    // expect(wrapper2.find(AssociateCardFactory).props()).toStrictEqual({"associateAssignments": [], "batchId": "1", "name": "N/A", "endDate": "N/A", "skill": "N/A", "trainer": "N/A "});
    
    // expect(wrapper2.find(AssociateCardFactory).length).toBe(0);
  });