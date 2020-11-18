import React from "react";
import { shallow } from "enzyme";
import { NewClientButton } from "../../../components/NewClientButton/NewClientButton";
import { Label, Modal, Input } from "reactstrap";

let wrapper: any;

beforeEach(() => {
  wrapper = shallow(<NewClientButton />);
});

test("modal toggles on and off", () => {
  expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
  wrapper.find("#toggleButton").simulate("click");
  expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
});

it("modal should have 5 label fields", () => {
  const labels = wrapper.find(Label);
  expect(labels.length).toBe(5);
});

it("modal should have 5 input fields", () => {
  const inputs = wrapper.find(Input);
  expect(inputs.length).toBe(5);
});

it("submit button should say 'Submit'", () => {
  expect(wrapper.find("#newClientButton").render().text()).toBe("Submit");
});
