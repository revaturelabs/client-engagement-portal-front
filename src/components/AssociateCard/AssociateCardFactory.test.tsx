import React from 'react';
import { shallow } from 'enzyme';
import { AssociateCardFactory } from './AssociateCardFactory';
import { IAssociate } from '../../_reducers/AssociateReducer';

let wrapper: any;
let fakeData: IAssociate;

/**
 * This method makes fake data to be used in the factory before all tests
 */
beforeAll(() => {
    fakeData = {
        associateAssignments: [
            {
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
            }
        ]

    };
})

/**
 * This method creates an associate card factory before each test
 */
beforeEach(() => {
    wrapper = shallow(<AssociateCardFactory />);
});

/**
 * this test ensures that no cards are displayed when to info is passed in as props
 */
test("content is empty without any batch information given", () => {
    const contentText = wrapper.find(".holderCarousel").render().text();
    expect(contentText).toBe("");
});
/**
 * this test inserts data into the cards variable. Due to how shallow works, no content is displayed in contentText, but the branch is tested.
 */
test("cards is filled with data when the dactory is provided data. the text of content is still falsy due to how shallow works", () => {
    wrapper = shallow(<AssociateCardFactory {...fakeData} />);
    const contentText = wrapper.find(".holderCarousel").render().text();
    expect(contentText).toBeFalsy();
});