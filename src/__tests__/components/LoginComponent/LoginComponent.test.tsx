import React from "react";
import { shallow } from "enzyme";
import { LoginComponent } from "../../../components/LoginComponent/LoginComponent";
import { Modal } from "reactstrap";


// Simple Test 1
it("Should render Engagement Force", () => {
    const wrapper = shallow(<LoginComponent/>)
    const div = wrapper.find('div.test1').text();

    expect(div).toBe("Engagement Force");

});

// Simple Test 2
it("Should render Login", () => {
    const wrapper = shallow(<LoginComponent/>)
    const div = wrapper.find('button.test2').text();

    expect(div).toBe("Login");
})


