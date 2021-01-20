import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import { Provider } from "react-redux";
import { store } from "../../Store";

import PlanInterventionModalv2 from "./PlanInterventionModalv2";

configure({ adapter: new Adapter() });

describe("Simple render test for PlanInterventionModalv2", () => {
    it("find button with classname intervention buton", () => {
        const wrapper = mount(
            <Provider store={store}>
                <PlanInterventionModalv2 />
            </Provider>
        );
        expect(wrapper.find(".intervention-button")).toBeDefined;
    })
});