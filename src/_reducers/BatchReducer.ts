import { SET_BATCHES, /* SET_BATCHES_DETAILS */ } from "../actions/BatchCardActions";
import { BatchState, Action } from '../types';

//Batch state is essentially just an array of batch objects

export const initialBatchState:BatchState = {
    batches: [] //empty array to start with
}

/**
 *
 * This reducer goes through every action type that exists in this program but will
 * only respond to the one that's called SET_BATCHES
 *
 * @param batchState the batch card state in the store is passed in automatically
 * @param action goes through every action in the program
 *
 * @returns Batch state. Basically just updates the batches state
 */
export const BatchReducer = (batchState:BatchState = initialBatchState, {type, payload}:Action) => {
    switch (type) {
        case SET_BATCHES:
            if (!payload) break;
            return {...payload};
        default: return {...batchState};
    }
}
