import React from 'react';
import {shallow} from 'enzyme';
import {AssociateCard} from './AssociateCard'
import { IAssociateSingle } from '../../_reducers/AssociateReducer';

let wrapper:any;
let fakeData:IAssociateSingle;

/**
 * This represents associate data to be used in the tests below.
 */
beforeAll(() => {
    fakeData = {
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
 * This beforeEach is used to create a new wrapper to render the AssociateCard with.
 */
beforeEach(() => {
    wrapper = shallow(<AssociateCard />)
});

/**
 * This test is used to check that the average test score of an associate
 * is equal to 74.00% when no associate test information is passed in as a parameter.
 */
test("average should equal 74.00% with fake tests passed as props",() => {
    const ac = shallow(<AssociateCard {...fakeData}/>)
    const average = ac.find("#averageHolder").render().text();
    expect(average).toBe("74.00%");
});

/**
 * This test is used to check that the average test score of an associate
 * is equal to 0.00% when no associate test information is passed in as a parameter.
 */
test("average should equal 0 with no tests passed as props",() => {
    const average = wrapper.find("#averageHolder").render().text();
    expect(average).toBe("0.00%");
});

/**
 * This test is used to check that the last test score of an associate
 * is equal to 0% when no associate test information is passed in as a parameter.
 */
test("last test score should equal 0 with no tests passed as props", () => {
    const score = wrapper.find("#scoreHolder").render().text();
    expect(score).toBe("Latest Test Score: 0.00%");
});

/**
 * This test is used to check that no name is printed on the associate card
 * when no associate name information is passed in as a parameter.
 */
test("associate's name field should be empty with no name passed as props", () => {
    const name = wrapper.find("#nameHolder").render().text();
    expect(name).toBe(" ");
});

/**
 * This test is used to check that the card is rendering properly.
 * The first div contains the associate's name and average test score,
 * the second div contains the associate's last test score,
 * and the last div holds the button that allows the modal to appear.
 */
test("there should be 3 divs in each associate card", () => {
    const divs = wrapper.find("div");
    expect(divs.length).toBe(3);
});
