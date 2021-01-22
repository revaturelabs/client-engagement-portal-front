import React from "react";
import BatchAverageGraph from "./BatchAverageGraph";
import { shallow } from "enzyme";
import { Batch, BIG_DATA } from "../../types";

const props: Batch = {
  type: "Any String'll do",
  location: "Austin, Texas",
  batchId: "TR-6969",
  name: "Mock Batch 69",
  goodGrade: 18,
  passingGrade: 0,
  currentWeek: 3,
  skill: BIG_DATA,
  endDate: "2018-07-30",
  startDate: "2018-10-08",
  employeeAssignments: [],
  associateAssignments: [
    {
      active: true,
      associate: {
        email: "mock4.associate769eee78-619c-4e9f-b0fd-d5f3fa9a2903@mock.com",
        salesforceId: "SF-6295",
        firstName: "Mock 4",
        lastName: "Associate 4",
        grades: [
          {
            gradeId: 1802,
            dateReceived: "2018-08-06",
            score: 78.79242,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1816,
            dateReceived: "2018-08-06",
            score: 83.91112,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1830,
            dateReceived: "2018-08-13",
            score: 63.179283,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1844,
            dateReceived: "2018-08-13",
            score: 74.45073,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1858,
            dateReceived: "2018-08-13",
            score: 97.15008,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1872,
            dateReceived: "2018-08-13",
            score: 82.00121,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1886,
            dateReceived: "2018-08-20",
            score: 55.8164,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1900,
            dateReceived: "2018-08-20",
            score: 87.46129,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1914,
            dateReceived: "2018-08-20",
            score: 98.48156,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1928,
            dateReceived: "2018-08-27",
            score: 66.27494,
            traineeId: "SF-6295",
          },
          {
            gradeId: 1942,
            dateReceived: "2018-08-27",
            score: 23.028385,
            traineeId: "SF-6295",
          },
        ],
      },
      endDate: "2018-07-30",
      startDate: "2018-10-08",
      trainingStatus: "Training",
    },
  ],
};

const setUp = () => {
  const component = shallow(<BatchAverageGraph batch={props} />);
  return component;
};

describe("BatchAverageGraph Component", () => {
  let component: any;
  beforeEach(() => {
    component = setUp();
  });

  it("Should Render To The Screen", () => {
    expect(component.render()).toBeTruthy();
  });

  it("Should Contain Canvas Element", () => {
    expect(component.containsMatchingElement(<canvas id="myChart" />)).toBe(
      true
    );
  });
});
