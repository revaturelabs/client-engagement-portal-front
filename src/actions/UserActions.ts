import { UserAdmin, UserClient } from "../types";

export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const CLIENT_LOGIN = "CLIENT_LOGIN";
export const LOGOUT = "LOGOUT";

export const adminLogin = (userData:UserAdmin) => ({
    type: ADMIN_LOGIN,
    payload: userData
});

export const clientLogin = (userData:UserClient) => ({
    type: CLIENT_LOGIN,
    payload: userData
});

export const logout = () => ({
    type: LOGOUT
});
