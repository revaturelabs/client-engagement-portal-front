import React from 'react';
import {shallow} from 'enzyme';
import {AssociateCardModal} from '../../../components/AssociateCard/AssociateCardModal';
import { IAssociate } from '../../../_reducers/AssociateReducer';
import {Modal} from 'reactstrap';

let wrapper: any;
let fakeData:IAssociate;

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

beforeEach(() => {
    wrapper = shallow(<AssociateCardModal {...fakeData}/>);
});

test("modal can toggle on and off", () => {
    expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
    wrapper.find("#openBtn").simulate("click");
    expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
    wrapper.find("#closeBtn").simulate("click");
    expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
});

test("testMap should have 4 divs", () => {
    const divs = wrapper.find("#weekAndScore");
    expect(divs.length).toBe(4);
})

test("test average should be 72.5%", () => {
    expect(wrapper.find("#avgTest").render().text()).toBe("72.5%");
})

test("techMap should have 3 divs", () => {
    const divs = wrapper.find("#techAndScore");
    expect(divs.length).toBe(3);
})

test("tech average should be 80%", () => {
    expect(wrapper.find("#avgTech").render().text()).toBe("80%");
})