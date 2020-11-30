import React from 'react';
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from '../../aws-exports';
import { LoginComponent } from './LoginComponent'
import { adminLogin, clientLogin } from '../../actions/UserActions';
import { connect, Provider } from 'react-redux';
import { store } from '../../Store';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ceplogo2 from "../../assets/engagementPortalLogo.svg";
import userThumb from "../../assets/user-thumb.png";
import passThumb from "../../assets/pass-thumb.png";
import "../../scss/loginStyles.scss";

configure({ adapter: new Adapter() });


/**
   * @Test
   * Component will create
   */

// it('Component Should Create', () => {
//     const component = mount(
//         <Provider store={store}>
//             <LoginComponent />
//         </Provider>
//     )
//     component.render();
//     expect(component.find(LoginComponent)).toHaveLength(1);
// })

// it('Should simulate logging in', () => {
//     const component = shallow(
//         <Provider store={store}>
//             <LoginComponent />
//         </Provider>
//     ).dive()
//     component.find('form').simulate('submit')
//     expect(component.find(LoginComponent)).toHaveLength(1);
// })



it('Component Should Create', () => {
    const wrapper = mount(
        <Provider store={store}>
            <LoginComponent />
        </Provider>
    )
    //test
    const handleSubmit = jest.fn().mockImplementation((cb) => () => cb({ test: 'test' }));
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toBeCalledTimes(2);
})
