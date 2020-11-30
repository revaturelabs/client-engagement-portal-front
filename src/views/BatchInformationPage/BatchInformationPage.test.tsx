import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BatchInformationPage } from './BatchInformationPage';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore([]);
let fakeData:any;
let store:any;

beforeAll(() => {
    
    fakeData = {
        match: {
            params: {
                batchId: "1",
            },
        },
        batches: [{
            name: "Test",
            endDate: "endDate",
            employeeAssignments: [{
                employee: {
                    firstName: "TestFName",
                    lastName: "TestLameName",
                },
            }],
            skill: "Java, React, Spring",
            associateAssignments: [{
                active: "true",
                associate: {
                    firstName: "wack",
                    lastName: "jobs",
                    grades: [{
                        gradeId: "GR6953",
                        dateReceived: "10/03/2020",
                        score: "5",
                    }],
                },
            }],
        }],
    }
    
});

describe("BatchInformationPage view", () => {
    let component:any;
    
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
                <BatchInformationPage {...fakeData} />
            </Provider>
        );
    });

    it("should render with given state from Redux store", () =>{
        expect(component.toJSON()).toMatchSnapshot;
    });
});