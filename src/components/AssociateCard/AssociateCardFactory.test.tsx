import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import { AssociateCardFactory } from './AssociateCardFactory'
import { Carousel } from 'reactstrap';
import { IAssociate } from '../../_reducers/AssociateReducer';

let wrapper: any;
let fakeData: IAssociate

/**
 * This beforeAll is used to test data being passed into the factory.
 */
beforeAll(() => {
    fakeData = {
        associateAssignments: [{
            associate: {
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
            }
        }]   
    };

});

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
    wrapper = shallow(<AssociateCardFactory />);
    const contentText = wrapper.find(".holderCarousel").render().text();
    expect(contentText).toBe("");
});

test("cards is not empty with fake data given", () => {
    wrapper = shallow(<AssociateCardFactory {...fakeData}/>);
    const contentText = wrapper.find(".holderCarousel").render().text();
    expect(contentText).toBeTruthy;
})
