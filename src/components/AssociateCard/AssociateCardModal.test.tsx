import React from 'react';
import {shallow} from 'enzyme';
import {AssociateCardModal} from './AssociateCardModal';
import { IAssociate } from '../../_reducers/AssociateReducer';
import {Modal} from 'reactstrap';

let wrapper: any;
let fakeData:IAssociate;

/**
 * This represents associate data to be used in the tests below.
 */
beforeAll(() => {
    fakeData = {
        firstName: "Bill",
        lastName: "Gates",
        testScores: [{
            week: 1,
            score: 90
        }, {
            week: 2,
            score: 80
        }, {
            week: 3,
            score: 70
        }, {
            week: 4,
            score: 50
        }],
        techScores: [{
            tech: "Java",
            score: 80
        }, {
            tech: "React",
            score: 70
        }, {
            tech: "SQL",
            score: 90
        }]
    };
});

/**
 * Sets a reference to the component using fake data.
 */
beforeEach(() => {
    wrapper = shallow(<AssociateCardModal {...fakeData}/>);
});

/**
 * This test to see if the modal is able to be properly toggeled.
 */
test("modal can toggle on and off", () => {
    expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
    wrapper.find("#openBtn").simulate("click");
    expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
    wrapper.find("#closeBtn").simulate("click");
    expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
});

/**
 * Usinf our fake data the number of divs should be 
 * equal to the number of weeks, which is 4 in this case.
 */
test("testMap should have 4 divs", () => {
    const divs = wrapper.find("#weekAndScore");
    expect(divs.length).toBe(4);
})

/**
 * The average test score should equal to the sum of all the weekly scores
 * divided by the number of weeks.
 */
test("test average should be 72.5%", () => {
    expect(wrapper.find("#avgTest").render().text()).toBe("72.5%");
})

/**
 * Using our fake data the number of divs should be
 * equal to the number of tech, which is 3 in this case.
 */
test("techMap should have 3 divs", () => {
    const divs = wrapper.find("#techAndScore");
    expect(divs.length).toBe(3);
})

/**
 * The average tech score should equal to the sum of all the tech scores
 * divided by the number of tech.
 */
test("tech average should be 80%", () => {
    expect(wrapper.find("#avgTech").render().text()).toBe("80%");
})