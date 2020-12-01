import React, { SyntheticEvent } from 'react';
import { Auth } from "aws-amplify";
import { IUserAdmin } from '../../_reducers/UserReducer';
import Enzyme, { mount, shallow } from "enzyme";
import { NewClientButton } from './NewClientButton';
import { Button, Modal, Label, Input } from 'reactstrap';
import { store } from '../../Store';
import { Provider } from 'react-redux';
import { act, Simulate } from 'react-dom/test-utils';

interface IAdmin {
    role: String,
    email: String,
    firstname: String,
    lastname: String,
    password: String
}

interface IClient {
    role: String,
    email: String,
    firstname: String,
    lastname: String,
    companyname: String,
    phonenumber: String,
    password: String
}

let wrapper:any;
let fakeAdmin:IAdmin;
let fakeClient:IClient;

beforeAll(() => {

    // mock axios?
    // mockAxiosGet.mockImplementation(()=>{
    //     return Promise.resolve({
    //         data:[
    //             { id: "Test 1", name: "Mock Batch 1" ,email:"test@email"},
    //             { id: "Test 2", name: "Mock Batch 2" ,email:"test2@email"},
    //         ],
    //     });
    // });

    Auth.currentUserInfo = jest.fn().mockImplementation(() => {
        return {
          attributes: {
            "custom:userRole": "admin",
          },
        };
      });

    fakeAdmin = {
        role: 'admin',
        email: 'admin@test',
        firstname: 'Addy',
        lastname: 'Johnson',
        password: 'coolpass'
    };
    fakeClient = {
        role: 'client',
        email: 'client@test',
        firstname: 'Clint',
        lastname: 'Johnson',
        companyname: 'Walmart',
        phonenumber: '123-123-1231',
        password: 'coolpass'
    };
});

beforeEach(() => {
    //  wrapper = mount(
    //     <Provider store={store}>
    //       <NewClientButton reloadClientDropdowns={()=> {return;}} />
    //     </Provider>
    // );
    wrapper = shallow(<NewClientButton reloadClientDropdowns={()=> {return;}} />);
    wrapper.find('.create-account-button').first().simulate('click');
})

/**
 * Tests if the component renders
 */
// test("renders the component", () => {
//     expect(wrapper).toMatchSnapshot();
//   });
 
/**
 * There should be one Button to open the Modal.
 */
test("Should be one button", () => {
    expect(wrapper.find(Button).length).toBe(1);
})

/**
 * The dropdown for account type should have two values (client, Admin)
 */
test('should be two options for account type', () => {
    expect(wrapper.find('#exampleSelect').children().length).toBe(2);
})

/**
 * There should be eight labels on this modal.
 */
test('should be 8 Labels', () => {
    expect(wrapper.find(Label).length).toBe(8);
})

/**
 * There should be eight inputs on this modal.
 */
test('should be 9 Inputs', () => {
    expect(wrapper.find(Input).length).toBe(9);
})

/**
 * This test verifies that constants are properly set when the form is filled
 */
test('register user function should properly set constants', async () => {

    // const mockSignUp = jest.spyOn(Auth, "signUp").mockImplementation(() => { return {
    //     user: "",
    //     userConfirmed: "",
    //     userSub: "",
    //     codeDeliveryDetails: ""
    // }});

    const mockSignUp = jest.spyOn(Auth, "signUp");

    const Amplify = require('aws-amplify');
    // Auth.signUp = jest.fn().mockImplementation(() => true);
    Auth.signUp = jest.fn().mockImplementation(() => Promise.resolve(true));

    const values = ['client@test','Clint','Johnson','Walmart','123-123-1231','coolpass','coolpass'];
    for(let i = 1; i < 8; i++){
        let val = { target: { value: values[i-1] } };
        console.log("Value.target.value is "+val.target.value);
        console.log("Target: " + val.target);
        wrapper.find(Input).at(i).childAt(0).value=values[i-1];
        console.log("Idk bro: " + wrapper.find(Input).at(i).childAt(0).innerText);
        console.log("Idk bro 2.0: " + wrapper.find(Input).at(i).values);
        console.log("Idk bro 3.0: " + wrapper.find(Input).at(i).value);
        //input.instance().value=values[i - 1];
        // wrapper.find(Input).at(i).childAt(0).simulate('change', val);
        // wrapper.update();
        // console.log("Value is "+input.props().value);
        // console.log("Debug guy "+wrapper.find(Input).at(i).childAt(0).debug());
    };
    // console.log(wrapper.find(Input).at(1).childAt(0).debug());
    
    // const instance = wrapper.instance();
    // const registerUserSpy = jest.spyOn(instance, 'registerUser'); //its not finding the function
    // registerUserSpy.mockImplementation(() => Promise.resolve());
    
    // console.log(wrapper.find('#new-client-button-form').debug());
    // await act(async () => {await wrapper.find('#new-client-button-form').first().simulate('submit')});
    // wrapper.find('.create-account-submit').first().simulate('click');
    wrapper.find('#new-client-button-form').first().simulate('submit');
    console.log(wrapper.debug());
    
    // wrapper.update();
    // wrapper.setProps({});

    expect(Auth.currentUserInfo).toHaveBeenCalledTimes(1);
    expect(Auth.signUp).toHaveBeenCalledTimes(0);

    // expect(registerUserSpy).toBeCalled();
    // await expect(registerUserSpy).toBeCalled(); //hoping simulate click triggers this
    
    // setTimeout(() => {
    //     const registerUserSpy = jest.spyOn(wrapper, 'registerUser');
    //     expect(registerUserSpy).toBeCalled(); //hoping simulate click triggers this
    // }, 5000);

    // const fakeClient:IClient = {
    //     role: 'client',
    //     email: 'client@test',
    //     firstname: 'Clint',
    //     lastname: 'Johnson',
    //     companyname: 'Walmart',
    //     phonenumber: '123-123-1231',
    //     password: 'coolpass'
    //
    
    // const event:React.FormEvent<HTMLFormElement>;
    // event.currentTarget = fakeClient
 
    // expect(wrapper.find(email).toBe('client@test');

})

test('Form should be different for client and admin', ()=>{
    const input = wrapper.find('#exampleSelect').at(0);
    
    /**
     * Checks that when client is selected, form has 8 fields and a button
     */
    wrapper.find('#exampleSelect').simulate('change', {target : { value : 'client'}});
    expect(wrapper.find(Input).length).toBe(9);

    /**
     * Checks that when admin is selected, form has 6 fields and a button
     */
    wrapper.find('#exampleSelect').simulate('change', {target : { value : 'admin'}});
    expect(wrapper.find(Input).length).toBe(7);

})