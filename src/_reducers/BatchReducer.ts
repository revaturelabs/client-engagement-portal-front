import { SET_BATCHES } from "../actions/BatchCardActions"

//Batch state is essentially just an array of batch objects
export interface IBatchState{
    batches: {
        id: number,
        skill: string,
        name: string
    }[];
}

export const initialBatchState:IBatchState = {
    batches: [{id: 0, skill: "", name: ""}] //empty array to start with
}

/**
<<<<<<< HEAD
 * 
 * This reducer goes through every action type that exists in this program but will 
 * only respond to the one that's called SET_BATCHES
 * 
=======
 *
 * This reducer goes through every action type that exists in this program but will
 *  only respond to the one that's called SET_BATCHES
 *
>>>>>>> 3a795374ee392df07d240f83451903ecb215b113
 * @param batchState the batch card state in the store is passed in automatically
 * @param action goes through every action in the program
 *
 * @returns Batch state. Basically just updates the batches state
 */
export const BatchReducer = (batchState:IBatchState = initialBatchState, action:any) => {
    switch(action.type)
    {
        case SET_BATCHES:
<<<<<<< HEAD
            if(action.payload != null)
                return batchState = { ...action.payload };  //places batch data into batchCard state
            else
=======
            if(action.payload != null) {
                return { ...action.payload }  //places batch data into batchCard state
            }
            else {
>>>>>>> 3a795374ee392df07d240f83451903ecb215b113
                return batchState;
            }
        default:
            return batchState;
    }
}
