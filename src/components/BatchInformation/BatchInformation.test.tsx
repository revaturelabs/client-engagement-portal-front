import React from "react";
import { shallow } from "enzyme";
import { BatchInformation } from "./BatchInformation";
import javaLogo from '../../assets/java-logo.png';
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaAuto from '../../assets/JavaAutoLogo.png';
import pegaLogo from '../../assets/Pegalogo.jpg';
import salesLogo from '../../assets/sales.png';
import bigData from '../../assets/bigData.png';
import netLogo from '../../assets/NET.jpg';
import devOpsLogo from '../../assets/devOps.jpg';

/**
 * Setup for a mocked batch information component
 * 
 * @param givenSpec The specialization chosen for this component. Should
 * determine the photo that is generated when the component is loaded up
 */
const setUp = (givenSpec: string) => {

    const props={
        batchId: "TR-6969",
        batchName: "Mock Batch 69",
        endDate: "tomorrow",
        skill: givenSpec,
        trainer: "batman",
        associateAssignments: undefined,
    };
    return shallow(<BatchInformation batches={[{...props}]}/>);
}

describe('batchinfocomp', () => {

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

     it("Should render core technology learned", () => {
        const label = component.find('b.readctl').text();
        expect(label).toBe("Core Technology Learned:");

        const skill = component.find("#test-skill");
        expect(skill.text()).toBe("Java/Microservices");
    });

     it("Should render readtrainer", () => {
        const trainerInfo = component.find("#test-train").text();
        expect(trainerInfo).toBe("Trainer: batman");
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
    });

    it("Should test that batch information component will mount", () => {
        expect(component).toBeTruthy();
    });

     it("Should render training end date", () => {
        const endDate = component.find("#test-end-date").text();
        expect(endDate).toBe("Training End Date: tomorrow");
    });
    
     it("Should render the speculation logo", () => {
        const image = component.find('.speclogo');
        expect(image.length).toBe(1);
    });

})