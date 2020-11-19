import React from "react";
import { shallow } from "enzyme";
import { LoginComponent } from "../../../components/LoginComponent/LoginComponent";
import { Modal } from "reactstrap";

const setUp = (props={}) => {
    const component = shallow(<LoginComponent {...props}/>);
    return component;
}

describe('logincomp', () => {

    let component: any;
    beforeEach(() => {
        component = setUp();
    });

    // Simple Test 1
    it("Should render Engagement Force", () => {
        const div = component.find('div.test1').text();

        expect(div).toBe("Engagement Force");

    });

    // Simple Test 2
    it("Should render Login", () => {
        const div = component.find('button.test2').text();

        expect(div).toBe("Login");
    })

      //Simple Test 3
      it("Should render an image", () => {
        const image = component.find('.userthumbcheck');
        expect(image.length).toBe(1);
    })

      //Simple Test 4
      it("Should render an image", () => {
        const image = component.find('.passthumbcheck');
        expect(image.length).toBe(1);
    })
})
