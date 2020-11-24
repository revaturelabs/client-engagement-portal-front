import React from 'react';
import { mount, shallow } from 'enzyme';
import { BatchCard } from './BatchCard';

const batch = {
    batchId: 5,
    specialization: "None", // can't contain actual specializations until image imports are mocked
    batchName: "A Mock Batch"
};

describe("Batch Card ", () => {
    it("accepts batch props", () => {
        const wrapper = mount(<BatchCard {... batch} />);

        expect(wrapper.props()).toEqual(batch);
    });

    it("contains specialization text", () => {
        const wrapper = mount(<BatchCard {... batch} />);
        const receivedText = wrapper.find("p.spec-text").text();
        expect(receivedText).toEqual("None");
    })
});





const setUp =
    (
        props=
        {
            batchId: 1,
            specialization: "Java/Microservices",
            batchName: "Dummy Batch"
        }
    ) =>
{
    return shallow(<BatchCard {...props}/>);
}

describe('batchcardcomp', () => {

    let component: any;
    beforeEach(() => {
        component = setUp();
    });

   // Simple Test 1
    it("Should render View", () => {
        const button = component.find('button.test1').text();

        expect(button).toBe("View");
    });

    //Simple Test 2
    it("Should render without errors", () => {
        const wrapper = component.find('.batchcardcomp');

        expect(wrapper.length).toBe(1);
    });

    //Simple Test 3
    it("Should render an image", () => {
        const image = component.find('.logoimg');
        expect(image.length).toBe(1);
    })
});
