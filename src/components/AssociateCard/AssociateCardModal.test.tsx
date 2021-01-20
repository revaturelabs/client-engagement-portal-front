import React from 'react';
import {shallow} from 'enzyme';
import {AssociateCardModal} from './AssociateCardModal';
import { Associate } from '../../types';
import {Button, Modal, /*ModalHeader*/} from 'reactstrap';

let wrapper: any;
let fakeData:Associate;

/**
 * This represents associate data to be used in the tests below.
 */
beforeAll(() => {
    fakeData = {
        email: 'billgates@ms.com',
        salesforceId: 'SF-1234',
        firstName: "Bill",
        lastName: "Gates",
        grades: [{
            dateReceived: "2020-10-21",
            gradeId: 2,
            score: 90,
            traineeId: "TR-1111"
        },
        {
            dateReceived: "2020-10-14",
            gradeId: 1,
            score: 60,
            traineeId: "TR-1111"
        },
        {
            dateReceived: "2020-10-28",
            gradeId: 3,
            score: 72,
            traineeId: "TR-1111"
        }
        ]
    };
});

/**
 * Sets a reference to the component using fake data.
 */
// beforeEach(() => {
//     wrapper = shallow(<AssociateCardModal {...fakeData}/>);
// });

/**
 * There should be a Button to open the Modal as well
 * as a Button to close the Modal.
 */
test("Should be one button", () => {
    expect(wrapper.find(Button).length).toBe(1);
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

/**
 * Using our fake data the number of divs should be 
 * equal to the number of grades, which is 3 in this case.
 */
test("gradeMap should have 3 divs", () => {
    const divs = wrapper.find("#grade");
    expect(divs.length).toBe(3);
})

// /**
//  * The average test score should equal to the sum of all the weekly scores
//  * divided by the number of weeks.
//  */
// test("grade average should be 74.00%", () => {
//     expect(wrapper.find("#avgGrade").render().text()).toBe("74.00%");
// })
