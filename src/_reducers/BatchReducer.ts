import { SET_BATCHES, SET_BATCHES_DETAILS } from "../actions/BatchCardActions"

//Batch state is essentially just an array of batch objects
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
export const BatchReducer = (batchState: IBatchState = initialBatchState, action: any) => {
    if (action?.type === SET_BATCHES) {
        if (action?.payload != null) {
            return { ...action.payload }; //places batch data into batchCard state
        }
        else {
            return batchState;
        }
    }
    else {
        return batchState;
    }
}

