import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-redux';
import HomePage from './HomePage';
import { store } from '../../Store';

const mockStore = configureStore([ thunk ]);

let homePageComp: any;
let fakeHomePageComp: any;
describe("HomePage", () => {

    beforeEach(() => {
        const fakeStore = mockStore({
            batchState:
            {
                batches: 
                [{
                    batchId: "TR-3434",
                    skill: "Java/Microservices",
                    name: "Dummy Name",
                }],
            },
            userState:{
                user:{
                    firstName: 'wack',
                    lastName: 'jobs',
                }     
            }
        });
        homePageComp = renderer.create(
            <Provider store={store}>
               <HomePage />
           </Provider>
       );

       fakeHomePageComp = renderer.create(
        <Provider store={fakeStore}>
           <HomePage />
       </Provider>
   );
       
    });

    it('should render with given state from Redux store', ()=>{
        expect(homePageComp.toJSON()).toMatchSnapshot(); //original store

        expect(fakeHomePageComp.toJSON()).toMatchSnapshot(); //fake store
    });

});