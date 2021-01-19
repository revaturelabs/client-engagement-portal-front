import {userReducer} from './UserReducer'

let reducer : any;
const reduce = require('./UserReducer')

test('reducer behaves correctly', () =>{

    reducer = jest.spyOn(reduce, 'userReducer');

    const isIUserAdmin = userReducer(undefined, {type: "ADMIN_LOGIN", payload: {email: "blah", phone:"blah", role:"blah"}});
    expect(isIUserAdmin).toEqual({user : {email: "blah", phone:"blah", role:"blah"}});
    }
)

