import React from "react";
import { shallow } from "enzyme";
import { NavBar } from "./NavBar";

const setUp = (props={loginType:"client"}) => {
    const component = shallow(<NavBar {...props}/>);
    return component;
}

describe('navbarcomp', () => {

    let component: any;
    beforeEach(() => {
        component = setUp();
    });

    //Simple Test 1
    it("Should render a image", () => {
        const image = component.find('.myLogo');
        expect(image.length).toBe(1);
    })

    //Simple Test 2
    it("Should render Welcome, Lorem Ipsum", () => {
        const span = component.find('span.testlorem').text();

        expect(span).toBe("Welcome, Lorem Ipsum");
    })

})