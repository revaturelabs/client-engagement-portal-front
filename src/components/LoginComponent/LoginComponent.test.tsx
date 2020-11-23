import React from "react";
import { shallow } from "enzyme";
import { LoginComponent } from "./LoginComponent";

const setUp = (props={loginType:"client"}) => {
    const component = shallow(<LoginComponent {...props}/>);
    return component;
}

describe('logincomp', () => {

    let component: any;
    beforeEach(() => {
        component = setUp();
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
      it("Should render another image", () => {
        const image = component.find('.passthumbcheck');
        expect(image.length).toBe(1);
    })
})