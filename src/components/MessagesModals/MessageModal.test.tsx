import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import { Provider } from "react-redux";
import { store } from "../../Store";

import { MessageModal } from "./MessageModal";
import { INewMessageProps } from "../../_reducers/MessageReducer"

configure({ adapter: new Adapter() });

let testMessageProps:INewMessageProps;

beforeAll(() => {
    testMessageProps = {
        show: true,
        toggle: () => {},
        isAdmin: false,
        clients: [],
        admins: []
    };
});

describe("Simple render tests for MessageModal", () => {
    it("has label with classname newMessageLabel", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MessageModal {...testMessageProps} />
            </Provider>
        );
        expect(wrapper.find(".newMessageLabel")).toBeDefined;
    })

    it("has submit button with classname send-message-button", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MessageModal {...testMessageProps} />
            </Provider>
        );
        expect(wrapper.find(".send-message-button")).toBeDefined;
    })

    it("has Modal component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MessageModal {...testMessageProps} />
            </Provider>
        );
        expect(wrapper.find("Modal")).toBeDefined;
    })
    
    it("has Form component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MessageModal {...testMessageProps} />
            </Provider>
        );
        expect(wrapper.find("Form")).toBeDefined;
    })

    it("has ModalFooter component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MessageModal {...testMessageProps} />
            </Provider>
        );
        expect(wrapper.find("ModalFooter")).toBeDefined;
    })

    it("has ModalBody component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MessageModal {...testMessageProps} />
            </Provider>
        );
        expect(wrapper.find("ModalBody")).toBeDefined;
    })

    it("has FormGroup component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MessageModal {...testMessageProps} />
            </Provider>
        );
        expect(wrapper.find("FormGroup")).toBeDefined;
    })

    it("has ModalHeader component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MessageModal {...testMessageProps} />
            </Provider>
        );
        expect(wrapper.find("ModalHeader")).toBeDefined;
    })
});