import { SET_ROLE } from "../_actions/LoginAction";

export interface IRole {
    role: string;
}

export const loginReducer = (state: any = null, action: any) => {
    switch (action.type) {
        case SET_ROLE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
