import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from 'enzyme';
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

    it("find Modal component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <PlanInterventionModalv2 />
            </Provider>
        );
        expect(wrapper.find("Modal")).toBeDefined;
    })

    it("find ModalBody component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <PlanInterventionModalv2 />
            </Provider>
        );
        expect(wrapper.find("ModalBody")).toBeDefined;
    })

    it("find Form component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <PlanInterventionModalv2 />
            </Provider>
        );
        expect(wrapper.find("Form")).toBeDefined;
    })

    it("find FormGroup component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <PlanInterventionModalv2 />
            </Provider>
        );
        expect(wrapper.find("FormGroup")).toBeDefined;
    })
    
    it("find ModalHeader component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <PlanInterventionModalv2 />
            </Provider>
        );
        expect(wrapper.find("ModalHeader")).toBeDefined;
    })
});