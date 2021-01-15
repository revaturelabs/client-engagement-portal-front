import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { NavBar } from './NavBar';
import { mount } from "enzyme";
import { ButtonDropdown } from 'reactstrap';
import thunk from 'redux-thunk';
import logo from '../../assets/logo.png';

let store:any;
let component:any;
let wrapper:any;

const mockStore = configureStore([ thunk ]);

describe('NavBar component', () => {

    test('should render with given state from Redux store', ()=>{
        store = mockStore({
            userState:{
                user:{
                    firstName: 'wack',
                    lastName: 'jobs',
                    role: 'admin'
                }     
            }   
        });
        component = renderer.create(
            <Provider store={store}>
               <NavBar route="test" logoSrc={ logo }/>
           </Provider>
       );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test("dropdown menu can toggle on and off", () => {

        store = mockStore({
            userState:{
                user:{
                    firstName: 'wack',
                    lastName: 'jobs',
                    companyName: 'wally world',
                    role:'client'
                }     
            }   
        }); 
    
        wrapper = mount(
            <Provider store={store}>
               <NavBar  route="test" logoSrc={ logo }/>
           </Provider> 
       );

        expect(wrapper.find(ButtonDropdown).prop("isOpen")).toBe(false);
        wrapper.find("button#navDropButton").simulate("click");
        expect(wrapper.find(ButtonDropdown).prop("isOpen")).toBe(true);
    });
});
