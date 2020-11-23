import { mount } from 'enzyme';
import React from 'react';
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