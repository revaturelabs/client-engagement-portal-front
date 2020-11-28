import React from "react";
import Enzyme, { EnzymeAdapter, shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import { BatchCard } from "./BatchCard";
import { Provider } from "react-redux";
import { store } from "../../Store";

Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * This function sets up a batch card object which has been given fake prop values
 * 
 * @param givenSpec represents one of the actual specializations in the database
 */
const setUp = (givenSpec: string) =>
{
    const props =
        {
            batchId: "TR-3424",
            specialization: givenSpec,
            batchName: "Dummy Batch"
        }
    const component = shallow(<Provider store={store}>
        <BatchCard batchId={props.batchId} 
        specialization={props.specialization} batchName={props.batchName} />
        </Provider>);
    return component;
}

/** collection of tests for the batch card component */
describe("Batch Card Component", () => {

    let component: any;
    let pegaComp: any;
    let javaAutoComp: any;
    let javaReactComp: any;
    let bigDataComp: any;
    let salesComp: any;
    let netComp: any;
    let devComp: any;
    beforeEach(() => {    //places the fake batch card into the component variable
        component = setUp("Java/Microservices");
        pegaComp = setUp("PEGA");
        javaAutoComp = setUp("Java with Automation");
        javaReactComp = setUp("Java React");
        bigDataComp = setUp("Big Data");
        salesComp = setUp("SalesForce");
        netComp = setUp(".NET/Microservices");
        devComp = setUp("Java Devops");
    });

    it("Should render view button", () => {
        const button = component.find(".test1");

        expect(button).toBe("View");
    });

    it("Should render the whole batch card without errors", () => {
        const wrapper = component.find('.batchcardcomp');

        expect(wrapper.length).toBe(1);
    });

    it("Should render an image", () => {
        const image = component.find('.logoimg');
        expect(image.length).toBe(1);
    })

    it("Should render each batch card with the proper photo", () => {

        let batchCard = TestRenderer.create(component).toJSON();
        expect(batchCard).toMatchSnapshot();

        batchCard = TestRenderer.create(pegaComp).toJSON();
        expect(batchCard).toMatchSnapshot();

        batchCard = TestRenderer.create(javaAutoComp).toJSON();
        expect(batchCard).toMatchSnapshot();

        batchCard = TestRenderer.create(javaReactComp).toJSON();
        expect(batchCard).toMatchSnapshot();

        batchCard = TestRenderer.create(bigDataComp).toJSON();
        expect(batchCard).toMatchSnapshot();

        batchCard = TestRenderer.create(salesComp).toJSON();
        expect(batchCard).toMatchSnapshot();

        batchCard = TestRenderer.create(netComp).toJSON();
        expect(batchCard).toMatchSnapshot();

        batchCard = TestRenderer.create(devComp).toJSON();
        expect(batchCard).toMatchSnapshot();
    });

});


