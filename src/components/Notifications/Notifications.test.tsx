import { notificationReducer } from '../../_reducers/NotificationReducer';

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