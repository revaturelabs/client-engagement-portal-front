import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
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
});