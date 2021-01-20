import React from 'react';
import {shallow, mount} from 'enzyme';
import {AssociateCardModal} from './AssociateCardModal';
import { Batch, Associate, BIG_DATA } from '../../types';
import {Button, Modal, /*ModalHeader*/} from 'reactstrap';

let wrapper: any;
let defaultBatchData:Batch;
let defaultAssociateData:Associate;
let salesforceId = 'SF-1234';

/**
 * This represents associate data to be used in the tests below.
 */
beforeAll(() => {
    defaultAssociateData = {
        email: 'billgates@ms.com',
        salesforceId,
        firstName: "Bill",
        lastName: "Gates",
        grades: [{
            dateReceived: "2020-10-21",
            gradeId: 2,
            score: 90,
            traineeId: salesforceId
        },
        {
            dateReceived: "2020-10-14",
            gradeId: 1,
            score: 60,
            traineeId: salesforceId
        },
        {
            dateReceived: "2020-10-28",
            gradeId: 3,
            score: 72,
            traineeId: salesforceId
        }
        ]
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
        associateAssignments: [{
            active: true,
            trainingStatus: 'pass',
            startDate: '',
            endDate: '',
            associate: defaultAssociateData
        }]
    }
});

/**
 * Sets a reference to the component using fake data.
 */
beforeEach(() => {
    wrapper = mount(<AssociateCardModal batch={defaultBatchData} traineeId={salesforceId} />);
});

/**
 * There should be a Button to open the Modal as well
 * as a Button to close the Modal.
 */
test("Should be one button", () => {
    expect(wrapper.find('#openBtn').length).toBe(1);
})

/**
 * This test to see if the modal is able to be properly toggeled.
 */
test("modal can toggle on and off", () => {
    expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
    wrapper.find("#openBtn").simulate("click");
    expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
});

/**
 * This test to see if the first and last name is rendered
 * correctly
 */
test("First and last name should show", () => {
    expect(wrapper.find("#associateName").render().text()).toBe("Bill Gates");
})

// /**
//  * The average test score should equal to the sum of all the weekly scores
//  * divided by the number of weeks.
//  */
// test("grade average should be 74.00%", () => {
//     expect(wrapper.find("#avgGrade").render().text()).toBe("74.00%");
// })
