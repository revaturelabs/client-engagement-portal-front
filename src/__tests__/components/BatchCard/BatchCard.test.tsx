import React from "react";
import { shallow } from "enzyme";
import { BatchCard } from "../../../components/BatchCard/BatchCard";
import { Modal } from "reactstrap";

// Simple Test 1
it("Should render View", () => {
    const wrapper = shallow(<BatchCard/>)
    const button = wrapper.find('button.test1').text();

    expect(button).toBe("View");

});