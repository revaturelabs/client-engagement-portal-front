import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import { AdminPage } from './AdminPage';

const mockStore = configureStore([ thunk ]);

let wrapper: any;
describe("AminPage", () => {

    beforeEach(() => {
        wrapper = renderer.create(
            <Provider store={store}>
               <AdminPage />
           </Provider>
       );
    });

    it('should render with given state from Redux store', ()=>{

        expect(wrapper.toJSON()).toMatchSnapshot(); //fake store
    });

});