import configureStore from 'redux-mock-store'
import { notificationReducer } from '../../_reducers/NotificationReducer';
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import Notifications from './Notifications';
import React from 'react';
import { addNotification, getNotifications, removeNotification } from './NotificationActions';

/**
 * Tests the notificationReducer and most of its functions
 */
describe('notification reducer', () => {
    /**
     * Tests the initial state by sending an action without a specific type.
     * The return statement should be an empty notifications array.
     */
    it('should return the initial state', () => {
        expect(notificationReducer(undefined, {type:"", payload:{clientName:"", subject: "", requestDate: ""}})).toEqual({notifications:[]});
    })

    /**
     * Tests the ADD_NOTIFICATION action by passing in an object and checking the state to confirm that it now has the object.
     * The return statement should be a notifications array with the payload added.
     */
    it('should handle ADD_NOTIFICATION', () => {
        expect(
            notificationReducer(undefined, {
                type: "ADD_NOTIFICATION",
                payload: {
                    clientName: "a1",
                    subject: "a2",
                    requestDate: "a3"
                }
            })
        ).toEqual({
            notifications: [
                {
                    clientName: "a1",
                    subject: "a2",
                    requestDate: "a3"
                }
            ]
        })
    })

    /**
     * Tests the REMOVE_NOTIFICATION action by having a default state with an object and then attempted to remove it from the state.
     * The return statement should be an empty notifications array.
     */
    it('should handle REMOVE_NOTIFICATION', () => {
        expect(
            notificationReducer({
                notifications: [ {
                    clientName: "a1",
                    subject: "a2",
                    requestDate: "a3"
                }]
            }, 
            {
                type: "REMOVE_NOTIFICATION",
                payload: {
                    clientName: "a1",
                    subject: "a2",
                    requestDate: "a3"
                }
            })
        ).toEqual({
            notifications: []
        })
    })
})

/**
 * Tests the notification actions
 */
describe('notification actions', () => {
    it('should return an add notification action', () => {
        expect(
            addNotification("a", "b", "c")
        ).toEqual(
            {
                type: "ADD_NOTIFICATION",
                payload: {
                    clientName: "a",
                    subject: "b",
                    requestDate: "c"
                }
            }
        )
    });

    it('should return a get notifications action', () => {
        expect(
            getNotifications("a", "b", "c")
        ).toEqual(
            {
                type: "GET_NOTIFICATIONS",
                payload: {
                    clientName: "a",
                    subject: "b",
                    requestDate: "c"
                }
            }
        )
    })

    it('should return a remove notification action', () => {
        expect(
            removeNotification("a", "b", "c")
        ).toEqual(
            {
                type: "REMOVE_NOTIFICATION",
                payload: {
                    clientName: "a",
                    subject: "b",
                    requestDate: "c"
                }
            }
        )
    })
})

// Tests that given a state, the notifications will render properly
describe('notification component', () => {

    const mockStore = configureStore([]);

    let store:any;
    let component:any;

    beforeEach(() => {
        store = mockStore({
            notificationState: {
                notifications: [
                    {
                        clientName: "a1",
                        subject: "a2",
                        requestDate: "a3"
                    }
                ]
            }
        });

        component = renderer.create(
            <Provider store={store}>
                <Notifications/>
            </Provider>
        )
    });

    it('should render the component with the given state', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
