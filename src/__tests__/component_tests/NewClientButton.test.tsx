import React from "react";
import { shallow } from "enzyme";
import { NewClientButton } from "../../component/NewClientButton/NewClientButton";
import { Modal } from "reactstrap";

let wrapper: any;

beforeEach(() => {
  wrapper = shallow(<NewClientButton />);
});

test("modal toggles on and off", () => {
  expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
  // console.log(wrapper.debug());
  wrapper.find("#toggleButton").simulate("click");
  expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
});
