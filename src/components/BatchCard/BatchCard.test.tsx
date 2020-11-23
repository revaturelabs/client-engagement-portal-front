import React from "react";
import { shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import { BatchCard } from "./BatchCard";

/**
 * This function sets up a batch card object which has been given fake prop values
 * 
 * @param props mocked props that a batch card might recieve from the database
 */
const setUp =
    (
        props=
        {
            batchId: "TR-3424",
            specialization: "Java/Microservices",
            batchName: "Dummy Batch"
        }
    ) =>
{
<<<<<<< HEAD
    return shallow(<BatchCard {...props}/>);
=======
    const component = shallow(<BatchCard batchId={props.batchId} specialization={props.specialization}
    batchName={props.batchName} />);
    return component;
>>>>>>> c5d8aad109a98dd6051b08f8be80a32d8a46993a
}

describe("Batch Card Component", () => {

    let component: any;
    beforeEach(() => {    //places the fake batch card into the component variable
        component = setUp();
    });

    it("Should render View", () => {
        const button = component.find('button.test1').text();

        expect(button).toBe("View");
    });

    it("Should render without errors", () => {
        const wrapper = component.find('.batchcardcomp');

        expect(wrapper.length).toBe(1);
    });

    it("Should render an image", () => {
        const image = component.find('.logoimg');
        expect(image.length).toBe(1);
    })

    it("Should render batch card with the information given", () => {

        const batchCard = TestRenderer.create(component).toJSON();
        expect(batchCard).toMatchSnapshot();
    });

});


