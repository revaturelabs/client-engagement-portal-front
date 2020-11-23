import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BatchForms } from "./BatchForms";
import axios from "axios";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });
const wrapper = shallow(<BatchForms />);

/**
 * @field
 * mockAxiosGet is mocking axios get request so it does not call the request 
 */
const mockAxiosGet = jest.spyOn(axios,"get");
/**
 * @function beforeEach
 * before each test give the mocked axios instance information
 */
beforeEach(()=>{

    mockAxiosGet.mockImplementation(()=>{
        return Promise.resolve({
            data:[
                { id: "Test 1", name: "Mock Batch 1" },
                { id: "Test 2", name: "Mock Batch 2" },
            ],
        });
    })
})
    
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
  /**
   * @function
   * testing that the <BatchForms> tag is rendering to the dom
   */
  it("should test that batch forms will mount", () => {
    expect(wrapper.render()).toBeTruthy();
  });
  /**
   * @function
   * testing that the mapping model is toggling on and of in the dom
   */
  it("should toggle model on and off", () => {
    const button = wrapper.find("#map-batch");
    button.simulate("click");
    expect(wrapper.find("#test-map").prop("toggle")).toBeTruthy();
  });
  /**
   * @function
   * testing that the unmapping model is toggling on and of in the dom
   */
  it("should toggle model on and off for unmap-batches", () => {
    const button = wrapper.find("#unmap-batch");
    button.simulate("click");
    expect(wrapper.find("#test-unmap").prop("toggle")).toBeTruthy();
  });
  /**
   * @function
   * testing that the axios call is getting information and passing it to the Modal for rendering
   */
  it("should test axios call", async () => {
    let wrapper2: any;
    await act(async () => {
      wrapper2 = mount(<BatchForms />);
    });
    const button = wrapper2.find("#map-batch");
    button.simulate("click");
    wrapper2.update();
    wrapper2.setProps({});
    expect(wrapper2.find("#map-options").children().length).toBeGreaterThan(1);
  });
  /**
   * @function
   * testing that the information being passed in is the correct information that axios is getting
   */
  it("should test that the mapping is correct for options",async ()=>{
    let wrapper2: any;
    await act(async () => {
      wrapper2 = mount(<BatchForms />);
    });
    const button = wrapper2.find("#map-batch");
    button.simulate("click");
    wrapper2.update();
    wrapper2.setProps({});
    console.log(wrapper2.debug());
    expect(wrapper2.find("#map-options").at(1).text()).toContain("Mock Batch 1");
  });
});
