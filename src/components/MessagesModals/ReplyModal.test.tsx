import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from 'enzyme';
import { Provider } from "react-redux";
import { store } from "../../Store";

import { ReplyModal } from "./ReplyModal";
import { IReplyModalProps } from "../../_reducers/MessageReducer"


configure({ adapter: new Adapter() });

let testReplyProps:IReplyModalProps;

beforeAll(() => {
    testReplyProps = {
        title: "good title",
        show: true,
        toggle: () => {},
        recipient: "good recipient",
    };
});

describe("Simple render tests for ReplyModal", () => {
    it("has label with classname talentTextAreaLabel", () => {
        const wrapper = mount(
            <Provider store={store}>
                <ReplyModal {...testReplyProps} />
            </Provider>
        );
        expect(wrapper.find(".talentTextAreaLabel")).toBeDefined;
    })

    it("has submit button with classname create-account-submit", () => {
        const wrapper = mount(
            <Provider store={store}>
                <ReplyModal {...testReplyProps} />
            </Provider>
        );
        expect(wrapper.find(".create-account-submit")).toBeDefined;
    })
    
    it("has Modal component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <ReplyModal {...testReplyProps} />
            </Provider>
        );
        expect(wrapper.find("Modal")).toBeDefined;
    })

    it("has Form component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <ReplyModal {...testReplyProps} />
            </Provider>
        );
        expect(wrapper.find("Form")).toBeDefined;
    })

    it("has ModalFooter component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <ReplyModal {...testReplyProps} />
            </Provider>
        );
        expect(wrapper.find("ModalFooter")).toBeDefined;
    })

    it("has ModalBody component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <ReplyModal {...testReplyProps} />
            </Provider>
        );
        expect(wrapper.find("ModalBody")).toBeDefined;
    })

    it("has FormGroup component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <ReplyModal {...testReplyProps} />
            </Provider>
        );
        expect(wrapper.find("FormGroup")).toBeDefined;
    })

    it("has ModalHeader component", () => {
        const wrapper = mount(
            <Provider store={store}>
                <ReplyModal {...testReplyProps} />
            </Provider>
        );
        expect(wrapper.find("ModalHeader")).toBeDefined;
    })
});