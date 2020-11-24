import { IUserAdmin, IUserClient } from "../_reducers/UserReducer";

export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const CLIENT_LOGIN = "CLIENT_LOGIN";
export const LOGOUT = "LOGOUT";

export const adminLogin = (userData:IUserAdmin) => ({
    type: ADMIN_LOGIN,
    payload: userData
});

export const clientLogin = (userData:IUserClient) => ({
    type: CLIENT_LOGIN,
    payload: userData
});

export const logout = () => ({
    type: LOGOUT
});