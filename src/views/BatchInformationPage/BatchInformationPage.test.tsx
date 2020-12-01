import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { BatchInformationPage, getBatchData } from "./BatchInformationPage";
import configureStore from "redux-mock-store";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Axios from "axios";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { BatchInformation } from "../../components/BatchInformation/BatchInformation";
import { AssociateCardFactory } from "../../components/AssociateCard/AssociateCardFactory";

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
    });

    component = renderer.create(
      <Provider store={store}>
        <BatchInformationPage {...initialData} />
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot;
  });
});

it("should test axios call", async () => {
    let wrapper2: any;
    await act(async () => {
      wrapper2 = mount(<Provider store={store}>
        <BatchInformationPage {...initialData} />
      </Provider>);
    });   
    //wrapper2.render();
    getBatchData("1");
    console.log(wrapper2.debug());
    wrapper2.update();
    wrapper2.setProps(fakeData);
    expect(wrapper2.find(BatchInformation).children().length).toBeGreaterThan(0);
  });

  it("should set trainer to N/A and associateAssignments to an empty array" , async () => {
    let wrapper2: any;
    await act(async () => {
      wrapper2 = mount(<Provider store={store}>
        <BatchInformationPage {...nullData} />
      </Provider>);
    });   
    wrapper2.render();
    wrapper2.setProps({});
    expect(wrapper2.find(AssociateCardFactory).props()).toStrictEqual({"associateAssignments": [{}], "batchId": "1", "batchName": "", "endDate": "", "skill": "", "trainer": "N/A"});
  });