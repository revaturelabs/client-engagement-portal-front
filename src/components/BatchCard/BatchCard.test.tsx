import React from "react";
import { shallow } from "enzyme";
import { BatchCard } from "./BatchCard";

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
