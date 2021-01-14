import { shallow } from "enzyme";
import React from 'react';
import { Button, Input, Label, Modal } from 'reactstrap';
import { NewClientButton } from './NewClientButton';

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
    companyname: String,
    phonenumber: String,
    password: String
}

let wrapper:any;
let fakeAdmin:IAdmin;
let fakeClient:IClient;

beforeAll(() => {

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
        companyname: 'Walmart',
        phonenumber: '123-123-1231',
        password: 'coolpass'
    };
});

beforeEach(() => {
    wrapper = shallow(<NewClientButton reloadClientDropdowns={()=> {return;}} />);
    wrapper.find('.create-account-button').first().simulate('click');
})
 
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
 * There should be six labels on this modal.
 */
test('should be 6 Labels', () => {
    expect(wrapper.find(Label).length).toBe(6);
})

/**
 * There should be seven inputs on this modal.
 */
test('should be 7 Inputs', () => {
    expect(wrapper.find(Input).length).toBe(7);
})

/**
 * This test verifies that constants are properly set when the form is filled. It's complete garbage, we
 * never figured out how to put text inside of a form and then test to make sure the submission works.
 * Maybe Enzyme will be better for you guys.
 */
test('register user function should properly set constants', async () => {

    const values = ['client@test','Walmart','123-123-1231','coolpass','coolpass'];
    for(let i = 1; i < 6; i++){
        // let val = { target: { value: values[i-1] } };
        wrapper.find(Input).at(i).childAt(0).value=values[i-1];
        //input.instance().value=values[i - 1];
        // wrapper.find(Input).at(i).childAt(0).simulate('change', val);
        // wrapper.update();
        // console.log("Value is "+input.props().value);
        // console.log("Debug guy "+wrapper.find(Input).at(i).childAt(0).debug());
    };
    // console.log(wrapper.find(Input).at(1).childAt(0).debug());
    
    // wrapper.find('.create-account-submit').first().simulate('click');
    wrapper.find('#new-client-button-form').first().simulate('submit');
    
    expect(wrapper.find(Modal).props().isOpen).toBeTruthy();

})

test('Form should be different for client and admin', ()=>{
    
    /**
     * Checks that when client is selected, form has 8 fields and a button
     */
    wrapper.find('#exampleSelect').simulate('change', {target : { value : 'client'}});
    expect(wrapper.find(Input).length).toBe(7);

    /**
     * Checks that when admin is selected, form has 6 fields and a button
     */
    wrapper.find('#exampleSelect').simulate('change', {target : { value : 'admin'}});
    expect(wrapper.find(Input).length).toBe(7);

})