import React, { SyntheticEvent } from 'react';
import { IUserAdmin } from '../../_reducers/UserReducer';
import Enzyme, { mount, shallow } from "enzyme";
import { NewClientButton } from './NewClientButton';
import { Button, Modal, Label, Input } from 'reactstrap';
import { store } from '../../Store';
import { Provider } from 'react-redux';

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
     wrapper = mount(
        <Provider store={store}>
          <NewClientButton />
        </Provider>   
    );
    wrapper.find('.create-account-button').first().simulate('click');
})

// Not sure if this will work
test("renders the component", () => {
    const component = shallow(<NewClientButton />);
    expect(component).toMatchSnapshot();
  });
 
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
    expect(wrapper.find('#exampleSelect').length).toBe(2);
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
test('register user function should properly set constants', () => {
    const input1 = wrapper.find("#email");
    input1.simulate('change', { target: { value: 'client@test' } });//not sure if this will work, seen it on stack overflow

    wrapper.find('.create-account-submit').first().simulate('click');
    // expect().toHaveBeenCalledTimes(1);
    // const val1 = wrapper.find(Input).at(1).instance().value=;
    

    
    // const fakeClient:IClient = {
    //     role: 'client',
    //     email: 'client@test',
    //     firstname: 'Clint',
    //     lastname: 'Johnson',
    //     companyname: 'Walmart',
    //     phonenumber: '123-123-1231',
    //     password: 'coolpass'
    //
    
    // wrapper.simulate("click", { preventDefault: () => null });

    

    // const event = {
    //     currentTarget: {
    //         client: fakeClient,
    //     }
    // } as unknown as React.FormEvent<HTMLFormElement>;

  

    // const event:React.FormEvent<HTMLFormElement>;
    // event.currentTarget = fakeClient
 
      
    // expect(wrapper.find(email).toBe('client@test');

// const email = event.currentTarget["email"].value;
// const password = event.currentTarget["password"].value;
// const role = event.currentTarget["select"].value;
// const firstName = event.currentTarget["firstName"].value;
// const lastName = event.currentTarget["lastName"].value;
// let companyName;
// let phoneNumber;
// if(role==='client') {
//   companyName = event.currentTarget["companyName"].value;
//   phoneNumber = event.currentTarget["phoneNumber"].value;
// }
    
// nativeEvent: unknown,
// target: 'asd',
// bubbles: false,
// cancelable: false,
// defaultPrevented: true,
// isDefaultPrevented: true,
// preventDefault: true,
// eventPhase: true,
// isTrusted: true,
// stopPropagation: false,
// isPropagationStopped: false,
// persist: true,
// timeStamp: false,
// type: 'cool',

})