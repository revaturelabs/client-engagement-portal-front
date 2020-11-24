import React from "react";
import { shallow } from "enzyme";
import { NewClientButton } from "./NewClientButton";
import { Label, Input } from "reactstrap";

let wrapper: any;

beforeEach(() => {
  wrapper = shallow(<NewClientButton />);
});

it("modal should have 5 label fields", () => {
  const labels = wrapper.find(Label);
  expect(labels.length).toBe(6);
});

it("modal should have 5 input fields", () => {
  const inputs = wrapper.find(Input);
  expect(inputs.length).toBe(6);
});
