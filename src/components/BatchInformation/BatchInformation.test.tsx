import React from "react";
import { shallow } from "enzyme";
import { BatchInformation } from "./BatchInformation";

const setUp = (props={
    batchId: "TR-6969",
    batchName: "Mock Batch 69",
    endDate: "tomorrow",
    skill: "nunchuck skills",
    trainer: "batman",
    associateAssignments: undefined,
}) => {
    return shallow(<BatchInformation batches={[{...props}]}/>);
}

describe('batchinfocomp', () => {

    let component: any;
    beforeEach(() => {
        component = setUp();
    });

     // Simple Test 1
     it("Should render CTL", () => {
        const b = component.find('b.readctl').text();

        expect(b).toBe("Core Technology Learned:");
    });

     // Simple Test 2
     it("Should render readtrainer", () => {
        const div = component.find('b.readtrainer').text();

        expect(div).toBe("Trainer:");
    });

     // Simple Test 3
     it("Should render training end date", () => {
        const b2 = component.find('b.readted').text();
        expect(b2).toBe("Training End Date:");
    });
    
     //Simple Test 4
     it("Should render the speculation logo", () => {
        const image = component.find('.speclogo');
        expect(image.length).toBe(1);
    });

})