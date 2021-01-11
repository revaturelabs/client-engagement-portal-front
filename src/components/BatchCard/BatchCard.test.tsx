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
import BatchCard from "./BatchCard";
import { BatchSkill, Batch } from '../../types';

Enzyme.configure({ adapter: new Adapter() });

/**
 * This function sets up a batch card object which has been given fake prop values
 * 
 * @param givenSpec represents one of the actual specializations in the database
 */
const setUp = (givenSpec: BatchSkill) =>
{
    const props:Batch={
        batchId: "TR-6969",
        name: "Mock Batch 69",
        endDate: "tomorrow",
        skill: givenSpec,
        trainer: "batman",
        startDate: 'before tomorrow',
        goodGrade: 80,
        passingGrade: 70,
        location: 'taxes',
        type: 'best kind',
        currentWeek: 420,
        employeeAssignments: [],
        associateAssignments: [],
    };

    const component = shallow(
        <BatchCard batch={props} searchTexts={[]} />);
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

    /* This funcionality is not easily testable, if at all */
    // it("Should cause a redirect when view button is clicked", () => {
        // const button = component.find("#test-btn");

        //this span should render BEFORE the button is clicked
        // let span = component.find("#no-redirect");
        // expect(span.length).toBe(1);

        // button.simulate("click"); //clicks the button

        //this span shouldn't render if the button is clicked
        // span = component.find("#no-redirect");
        // expect(span.length).toBe(0);
    // });

    it("Should render the whole batch card without errors", () => {
        const wrapper = component.find("#batchcardcomp");

        expect(wrapper.length).toBe(1);
    });

    it("Should render all of the correct images", () => {
        let image = component.find("img");
        expect(JSON.stringify(image.prop("src"))).toEqual(JSON.stringify(javaLogo));

        image = pegaComp.find("img");
        expect(JSON.stringify(image.prop("src"))).toEqual(JSON.stringify(pegaLogo));

        image = javaAutoComp.find("img");
        expect(JSON.stringify(image.prop("src"))).toEqual(JSON.stringify(javaAuto));

        image = javaReactComp.find("img");
        expect(JSON.stringify(image.prop("src"))).toEqual(JSON.stringify(reactReduxLogo));

        image = bigDataComp.find("img");
        expect(JSON.stringify(image.prop("src"))).toEqual(JSON.stringify(bigData));

        image = salesComp.find("img");
        expect(JSON.stringify(image.prop("src"))).toEqual(JSON.stringify(salesLogo));

        image = netComp.find("img");
        expect(JSON.stringify(image.prop("src"))).toEqual(JSON.stringify(netLogo));

        image = devComp.find("img");
        expect(JSON.stringify(image.prop("src"))).toEqual(JSON.stringify(devOpsLogo));
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