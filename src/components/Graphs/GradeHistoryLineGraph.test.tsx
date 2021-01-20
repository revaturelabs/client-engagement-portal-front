import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AssociateAssignment, Batch, BIG_DATA } from '../../types';
import GradeHistoryLineGraph from "../Graphs/GradeHistoryLineGraph";

Enzyme.configure({ adapter: new Adapter() });

let defaultAssociateData:AssociateAssignment;
let defaultBatchData:Batch;

defaultAssociateData = { 
    active: true,
    trainingStatus: "",
    startDate: "",
    endDate: "",
    associate: {
        firstName: "",
        lastName: "",
        salesforceId: "",
        email: "",
        
        grades: [{
            dateReceived: "",
            gradeId: 0,
            score: 0,
            traineeId: ""
        }]
    }
}

defaultBatchData = {
    batchId: "",
    skill: BIG_DATA,
    name: "",
    startDate: "",
    location: "",
    currentWeek: 0,
    type: "",
    endDate: "",
    trainer: "",
    goodGrade: 0,
    passingGrade: 0,
    employeeAssignments: [{
        role: "",
        employee: {
            firstName: "",
            lastName: "",
            email: ""
        }
    }],
    associateAssignments: [defaultAssociateData]
}

it('renders without crashing', () => {
    shallow(<GradeHistoryLineGraph batch={defaultBatchData} traineeId={defaultAssociateData.associate.grades[0].traineeId}/>)
});
