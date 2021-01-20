import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import { Provider } from "react-redux";
import { store } from "../../Store";
import { IMessage, IMessageState } from "../../_reducers/MessagesReducer";

import Messages  from "./Messages";

configure({ adapter: new Adapter() });

let testMessageState:IMessageState;

beforeAll(() => {
    testMessageState = {
        messages: null
    };
});

describe("Simple render tests for Messages", () => {
    it("has h5 with classname message-title", () => {
        const wrapper = mount(
            <Provider store={store}>
                <Messages {...testMessageState} />
            </Provider>
        );
        expect(wrapper.find(".message-title")).toBeDefined;
    })

    it("has div with classname card-body", () => {
        const wrapper = mount(
            <Provider store={store}>
                <Messages {...testMessageState} />
            </Provider>
        );
        expect(wrapper.find(".card-body")).toBeDefined;
    })
});