import { batch } from "react-redux";
import { SET_BATCHES } from "../actions/BatchCardActions"

export interface IBatchState{
    batches: {
        id: number,
        skill: string,
        name: string
    }[];
}

export const initialBatchState:IBatchState = {
    batches: [] //empty array to start with
}

export const BatchReducer = (batchState:IBatchState = initialBatchState, action:any) => {
    switch(action.type)
    {
        case SET_BATCHES:
            if(action.payload != null)
                return batchState = { batches: [...action.payload] }  //places batch data into batchCard state
            else
                return batchState;
        default:
            return batchState;
    }
}