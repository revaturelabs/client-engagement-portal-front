import {userReducer} from './UserReducer'




let reducer : any;
const reduce = require('./UserReducer')

test('reducer behaves correctly', () =>{

    reducer = jest.spyOn(reduce, 'userReducer');

    const isNull = userReducer(undefined, {type: "ADMIN_LOGIN", payload: {email: "blah", firstName: "blah", lastName: "blah", phone:"blah"}});
    expect(isNull).toBeNull;
    }
)

