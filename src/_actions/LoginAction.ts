import { IRole } from "../_reducers/LoginReducer";

export const SET_ROLE = "SET_ROLE";

export const setRole = (role: IRole) => ({
    type: SET_ROLE,
    payload: role,
});
