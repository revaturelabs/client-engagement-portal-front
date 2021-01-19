import { ADMIN_LOGIN, CLIENT_LOGIN, LOGOUT } from "../actions/UserActions";

export interface IUser{
    email:string,
    firstName:string,
    lastName:string,
    phone?:string,
}

export interface IUserAdmin extends IUser{
    
}

export interface IUserClient extends IUser{
    businessFunction?:string,
    industry?:string,
    companyName?:string
}

export interface IUserState{
    user:IUser|null
}

const initialState:IUserState = {user:null};

/**
 * Stores the necessary front user details after a user has logged in.
 *
 * @param state The current User.
 *
 * @param action Object indicating which user is being affected and how.
 */
export const userReducer = (state:IUserState = initialState, action:{type:string, payload:IUser}):IUserState => {
    switch(action.type){
        case ADMIN_LOGIN:
            if(action.payload == null)
                return {user: null};
            else
                return {user: action.payload as IUserAdmin};
        case CLIENT_LOGIN:
            if(action.payload == null)
                return {user: null};
            else
                return {user: action.payload as IUserClient};
        case LOGOUT:
            return {user: null};
        default:
            return state;
    }
}