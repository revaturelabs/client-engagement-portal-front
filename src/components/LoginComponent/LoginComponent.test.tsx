import React from 'react';
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { LoginComponent } from './LoginComponent'
import { Provider } from 'react-redux';
import { store } from '../../Store';
import "../../scss/loginStyles.scss";

configure({ adapter: new Adapter() });

/**
   * @Test
   * Component will create
   */

it('Component Should Create', () => {
    const wrapper = mount(
        <Provider store={store}>
            <LoginComponent />
        </Provider>
    )
    expect(wrapper.find('.login-form').length).toBe(1);
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    wrapper.find('.login-form').simulate('submit', fakeEvent);
})
