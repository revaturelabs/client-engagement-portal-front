import React from 'react';
import {shallow} from 'enzyme';
import {AssociateCardFactory} from './AssociateCardFactory'
import { Carousel } from 'reactstrap';

let wrapper:any;

/**
 * This beforeEach is used to create a new wrapper to render the AssociateCardFactory with.
 */
beforeEach(() => {
    wrapper = shallow(<AssociateCardFactory />);
});

/**
 * This test is used to check that no AssociateCards are created when
 * the factory is not passed any state or parameters about a batch.
 */
test("content is empty without any batch information given", () => {
    const contentText = wrapper.find(Carousel).render().text();
    expect(contentText).toBe("");
});