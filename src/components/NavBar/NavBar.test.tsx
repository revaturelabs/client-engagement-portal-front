import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { NavBar } from './NavBar';
import { shallow, mount } from "enzyme";
import { ButtonDropdown } from 'reactstrap';
import thunk from 'redux-thunk';
import logo from '../../assets/logo.png';


let store:any;
let component:any;
let wrapper:any;

const mockStore = configureStore([ thunk ]);

describe('NavBar component', () => {

    beforeEach(() => {
        store = mockStore({
            userState:{
                user:{
                    firstName: 'wack',
                    lastName: 'jobs',
                }     
            }   
        });
        component = renderer.create(
            <Provider store={store}>
               <NavBar route="test" logoSrc={ logo }/>
           </Provider>
       );
    });

    it('should render with given state from Redux store', ()=>{
        expect(component.toJSON()).toMatchSnapshot();
    });

    
});
