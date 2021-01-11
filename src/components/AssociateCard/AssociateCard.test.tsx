import React from 'react';
import {shallow} from 'enzyme';
import { AssociateCard } from './AssociateCard';
import { Associate } from '../../types';

let wrapper:any;
let fakeData:Associate;

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
 * This beforeEach function creates a wrapper with the AssociateCard inside it before every test
 */
beforeEach(() => {
    wrapper = shallow(<AssociateCard {...fakeData}/>)
});

/**
 * This test checks that the average is calculated correctly with the given fake data.
 */
test("average should equal 74 with 3 fake grades passed as props",() => {
    const average = wrapper.find("#averageHolder").render().text();
    expect(average).toBe("74.00%");
});

/**
 * This test checks that the correct test score is selected for the last test score display.
 */
test("last test score should equal 72 with 3 fake grades passed as props", () => {
    const score = wrapper.find("#scoreHolder").render().text();
    expect(score).toBe("Latest Test Score: 72.00%");
});

/**
 * This test checks that the associate's name field is properly populated with the fake name given.
 */
test("associate's name field should be filled out with a fake name passed as props", () => {
    const name = wrapper.find("#nameHolder").render().text();
    expect(name).toBe("Bill Gates");
});

/**
 * This test is used to check that the card is rendering properly.
 * The first div contains the associate's name and average test score,
 * the second div contains the associate's last test score,
 * and the last div holds the button that allows the modal to appear.
 */
test("there should be 4 divs in each associate card", () => {
    const divs = wrapper.find("div");
    expect(divs.length).toBe(4);
});

