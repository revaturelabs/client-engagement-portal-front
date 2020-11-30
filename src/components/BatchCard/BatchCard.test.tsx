import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import javaLogo from '../../assets/java-logo.png';
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaAuto from '../../assets/JavaAutoLogo.png';
import pegaLogo from '../../assets/Pegalogo.jpg';
import salesLogo from '../../assets/sales.png';
import bigData from '../../assets/bigData.png';
import netLogo from '../../assets/NET.jpg';
import devOpsLogo from '../../assets/devOps.jpg';
import { BatchCard } from "./BatchCard";

Enzyme.configure({ adapter: new Adapter() });

/**
 * This function sets up a batch card object which has been given fake prop values
 * 
 * @param givenSpec represents one of the actual specializations in the database
 */
const setUp = (givenSpec: string) =>
{
    const component = shallow(
        <BatchCard batchId="TR-3424" 
        specialization={givenSpec} batchName="Dummy Batch" />);
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
        const button = component.find("#test-btn");

        expect(button.text()).toBe("View");
    });

    it("Should cause a redirect when view button is clicked", () => {
        const button = component.find("#test-btn");

        //this span should render BEFORE the button is clicked
        let span = component.find("#no-redirect");
        expect(span.length).toBe(1);

        button.simulate("click"); //clicks the button

        //this span shouldn't render if the button is clicked
        span = component.find("#no-redirect");
        expect(span.length).toBe(0);
    });

    it("Should render the whole batch card without errors", () => {
        const wrapper = component.find("#batchcardcomp");

        expect(wrapper.length).toBe(1);
    });

    it("Should render all of the correct images", () => {
        let image = component.find("img");
        expect(image.prop("src")).toBe(javaLogo);

        image = pegaComp.find("img");
        expect(image.prop("src")).toBe(pegaLogo);

        image = javaAutoComp.find("img");
        expect(image.prop("src")).toBe(javaAuto);

        image = javaReactComp.find("img");
        expect(image.prop("src")).toBe(reactReduxLogo);

        image = bigDataComp.find("img");
        expect(image.prop("src")).toBe(bigData);

        image = salesComp.find("img");
        expect(image.prop("src")).toBe(salesLogo);

        image = netComp.find("img");
        expect(image.prop("src")).toBe(netLogo);

        image = devComp.find("img");
        expect(image.prop("src")).toBe(devOpsLogo);
    })

    it("Should render batch name and specialization", () => {
        const name = component.find("#test-name");
        expect(name.text()).toBe("Dummy Batch");

        const spec = component.find("#test-spec");
        expect(spec.text()).toBe("Java/Microservices");
    })

    it("Should test that batch cards will mount", () => {
        expect(component).toBeTruthy();
      });
});