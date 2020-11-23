import React from 'react';
import {shallow} from 'enzyme';
import {AssociateCard} from './AssociateCard'

let wrapper:any;

/**
 * This beforeEach is used to create a new wrapper to render the AssociateCard with.
 */
beforeEach(() => {
    wrapper = shallow(<AssociateCard />)
});

/**
 * This test is used to check that the average test score of an associate
 * is equal to 0% when no associate test information is passed in as a parameter.
 */
test("average should equal 0 with no tests passed as props",() => {
    const average = wrapper.find("#averageHolder").render().text();
    expect(average).toBe("0%");
});

/**
 * This test is used to check that the last test score of an associate
 * is equal to 0% when no associate test information is passed in as a parameter.
 */
test("last test score should equal 0 with no tests passed as props", () => {
    const score = wrapper.find("#scoreHolder").render().text();
    expect(score).toBe("Latest Test Score: 0%");
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