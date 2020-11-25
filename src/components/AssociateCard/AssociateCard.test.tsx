import React from 'react';
import {shallow} from 'enzyme';
import { AssociateCard } from './AssociateCard';

let wrapper:any;

beforeEach(() => {
    wrapper = shallow(<AssociateCard />)
});

test("average should equal 0 with no tests passed as props",() => {
    const average = wrapper.find("#averageHolder").render().text();
    expect(average).toBe("0%");
});

test("last test score should equal 0 with no tests passed as props", () => {
    const score = wrapper.find("#scoreHolder").render().text();
    expect(score).toBe("Latest Test Score: 0%");
});

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
test("there should be 4 divs in each associate card", () => {
    const divs = wrapper.find("div");
    expect(divs.length).toBe(4);
});

