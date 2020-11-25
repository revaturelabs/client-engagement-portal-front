import React from 'react';
import {shallow} from 'enzyme';
import { AssociateCardFactory } from './AssociateCardFactory';

let wrapper:any;

beforeEach(() => {
    wrapper = shallow(<AssociateCardFactory />);
});

test("content is empty without any batch information given", () => {
    const contentText = wrapper.find("#contentHolder").render().text();
    expect(contentText).toBe("");
});