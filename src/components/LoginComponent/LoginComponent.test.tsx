import React from "react";
import { shallow } from "enzyme";
import { LoginComponent } from "./LoginComponent";

const setUp = (props={loginType:"client"}) => {
    return shallow(<LoginComponent {...props}/>);
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
      it("Should render user thumbnail", () => {
        const image = component.find('.userthumbcheck');
        expect(image.length).toBe(1);
    })

      //Simple Test 4
      it("Should render password thumbnail", () => {
        const image = component.find('.passthumbcheck');
        expect(image.length).toBe(1);
    })
})
