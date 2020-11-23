import React from "react";
import Enzyme, { EnzymeAdapter, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BatchForms } from "./BatchForms";
import axios from "axios";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });
const wrapper = shallow(<BatchForms />);
//axios.get.mockResolvedValue(data);

jest.mock('axios');

axios.get = jest.fn().mockImplementationOnce(() => {
  Promise.resolve( {
    data: [
      { batchId: "Test 1", name: "Mock Batch 1" },
      { batchId: "Test 2", name: "Mock Batch 2" },
    ],
  })
});

/**
 * @function
 * Testing the batch forms
 */
describe("BatchForms", () => {
  /**
   * @function
   * testing to find the that the map batch button is rendering with correct text
   */
  it("should find map header on button", () => {
    const text = wrapper.find("#map-batch");
    expect(text.text()).toBe("Map Batch To Client");
  });
  /**
   * @function
   * testing to find the that the unmap batch button is rendering with correct text
   */
  it("should find unmap header on button", () => {
    const text = wrapper.find("#unmap-batch");
    expect(text.text()).toBe("Unmap Batch From Client");
  });
  /**
   * @function
   * testing to find ensure we have options
   */
  it("should find select batch options", () => {
    const options = wrapper.find("#map-options");
    expect(options.length).toBe(1);
  });
  it("should test that batch forms will mount", () => {
    expect(wrapper.render()).toBeTruthy();
  });
  it("should toggle model on and off", () => {
    const button = wrapper.find("#map-batch");
    button.simulate("click");
    expect(wrapper.find("#test-map").prop("toggle")).toBeTruthy();
  });
  it("should test axios call", async () => {
    let wrapper2: any;
    await act(async () => {
      wrapper2 = mount(<BatchForms />);
    });
    wrapper2.update();
    wrapper2.setProps({});
    const options = wrapper2.find("#map-options");
    console.log(options.debug());
    expect(options.children).toBeTruthy();
  });
});
