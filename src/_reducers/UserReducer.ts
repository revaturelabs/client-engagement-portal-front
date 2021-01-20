import { ADMIN_LOGIN, CLIENT_LOGIN, LOGOUT } from "../actions/UserActions";
import { UserState, User, UserAdmin, UserClient } from '../types';

const initialState:UserState = {user:null};

/**
 * Stores the necessary front user details after a user has logged in.
 *
 * @param state The current User.
 *
 * @param action Object indicating which user is being affected and how.
 */
export const userReducer = (state:UserState = initialState, action:{type:string, payload:User}):UserState => {
    switch(action.type){
        case ADMIN_LOGIN:
            if(action.payload == null)
                return {user: null};
            else
                return {user: action.payload as UserAdmin};
        case CLIENT_LOGIN:
            if(action.payload == null)
                return {user: null};
            else
                return {user: action.payload as UserClient};
        case LOGOUT:
            return {user: null};
        default:
            return state;
    }
}