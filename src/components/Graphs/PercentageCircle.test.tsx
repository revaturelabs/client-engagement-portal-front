import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PercentageCircle from "./PercentageCircle";
import { Batch } from '../../types';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Tests rendering and basic functionality of the PercentageCircle component.
 */

let defaultData:Batch;

beforeAll(() => {
    defaultData = {
        batchId: 'N/A',
        name: "N/A",
        endDate: "N/A",
        trainer: "N/A",
        location: 'N/A',
        startDate: 'N/A',
        currentWeek: 0,
        type: 'N/A',
        goodGrade: 0,
        passingGrade: 0,
        employeeAssignments: [{
            role: 'N/A',
            employee: {
                email: 'N/A',
                firstName: "N/A",
                lastName: ""
            },
        }],
        skill: "N/A",
        associateAssignments: []
    }
});


it("renders without crashing", () => {
    shallow(<PercentageCircle batch={defaultData}/>)
});