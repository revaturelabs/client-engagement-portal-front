import configureStore from 'redux-mock-store'
import { notificationReducer } from '../../_reducers/NotificationReducer';
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import Notifications from './Notifications';
import React from 'react';
import { setNotifications } from '../../actions/NotificationActions';
import axios from "axios";

/**
 * Tests the notificationReducer and most of its functions
 */
describe('notification reducer', () => {
    /**
     * Tests the initial state by sending an action without a specific type.
     * The return statement should be an empty notifications array.
     */
    it('should return the initial state', () => {
        expect(notificationReducer(undefined, {type:"", payload:[]})).toEqual({notifications:[]});
    })

    /**
     * Tests the SET_NOTIFICATIONS action by setting the state of notifications.
     */
    it('should handle SET_NOTIFICATION', () => {
        expect(
            notificationReducer(
                undefined, 
            {
                type: "SET_NOTIFICATIONS",
                payload: [{
                    requestId:0,
                    requestType:"TALENT",
                    status:"DONE",
                    dateCreated:"1/1/2021",
                    message:"Need more",
                    client: {
                        clientId:0,
                        email:"client@client.com",
                        companyName:"Google",
                        phoneNumber:"123-456-7890"
                    }
                }]
            })
        ).toEqual({
            notifications: [{
                requestId:0,
                requestType:"TALENT",
                status:"DONE",
                dateCreated:"1/1/2021",
                message:"Need more",
                client: {
                    clientId:0,
                    email:"client@client.com",
                    companyName:"Google",
                    phoneNumber:"123-456-7890"
                }
            }]
        })
    })
})

/**
 * Tests the notification actions
 */
describe('notification actions', () => {

    it('should return a get notifications action', () => {
        expect(
            setNotifications([])
        ).toEqual(
            {
                type: "SET_NOTIFICATIONS",
                payload: []
            }
        )
    })
})

const mockStore = configureStore([]);


/**
 * @field
 * mockAxiosGet is mocking axios get request so it does not call the request from the application
 */
const mockAxiosGet = jest.spyOn(axios,"get")

/**
 * @function beforeEach
 * before each test create a variable ax to mock the function axiosInstance and have it return axios.
 * Then it will mock the return information and give you dummy data.
 */
beforeEach(() => {

    const ax = require('../../util/axiosConfig')
    ax.axiosInstance = jest.fn(() => {return axios})

    mockAxiosGet.mockImplementation(()=>{
        return Promise.resolve({
            data:[{
                requestId:0,
                requestType:"TALENT",
                status:"DONE",
                dateCreated:"1/1/2021",
                message:"Need more",
                client: {
                    clientId:0,
                    email:"client@client.com",
                    companyName:"Google",
                    phoneNumber:"123-456-7890"
                }
            }],
        });
    });
});

// Tests that given a state, the notifications will render properly
describe('notification component', () => {
    
    let store:any;
    let component:any;

    store = mockStore({
        notificationState: {
            notifications: []
        }
    });

    beforeEach(() => {
        component = renderer.create(
            <Provider store={store}>
                <Notifications/>
            </Provider>
        )
    })

    it('should render the component with the given state', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
