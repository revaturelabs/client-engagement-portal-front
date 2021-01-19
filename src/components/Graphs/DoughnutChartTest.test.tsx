import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DoughnutChart from "./DoughnutChart";
import { BatchCard } from "../BatchCard/BatchCard";
import { Batch } from '../../types';
import { batch } from "react-redux";
import { getBatchData } from "../../ajax";
import BatchInformationPage from "../../views/BatchInformationPage/BatchInformationPage";

Enzyme.configure({ adapter: new Adapter() });

/**
 * Tests rendering and basic functionality of the DoughnutChart component.
 */

let defaultData:Batch;

beforeAll(() => {
    defaultData = {
        batchId: 'N/A',
        name: "N/A",
        endDate: "N/A",
        trainer: "N/A",
        goodGrade: 0,
        passingGrade: 0,
        employeeAssignments: [{
            employee: {
                firstName: "N/A",
                lastName: ""
            },
        }],
        skill: "N/A",
        associateAssignments: []
    }
});


it("renders without crashing", () => {
    shallow(<DoughnutChart batch = {defaultData}/>)
});