import { batch } from "react-redux";
import { SET_BATCHES, SET_BATCHES_DETAILS } from "../actions/BatchCardActions"

//Batch state is essentially just an array of batch objects
export interface IBatchState {
    batches: {
        id: number,
        skill: string,
        name: string
    }[];
}

export const initialBatchState: IBatchState = {
    batches: [{ id: 0, skill: "", name: "" }] //empty array to start with
}

/**
 * 
 * This reducer goes through every action type that exists in this program but will 
 *  only respond to the one that's called SET_BATCHES
 * 
 * @param batchState the batch card state in the store is passed in automatically
 * @param action goes through every action in the program 
 * 
 * @returns Batch state. Basically just updates the batches state
 */
export const BatchReducer = (batchState: IBatchState = initialBatchState, action: any) => {
    switch (action.type) {
        case SET_BATCHES:
            if (action.payload != null)
                return batchState = { ...action.payload }  //places batch data into batchCard state
            else
                return batchState;
        default:
            return batchState;
    }
}

//Jordan code below
//This interface is used to get more detailed information about a batch
export interface IBatchDetailedState {
    batches: {
        id: number,
        batchId: string,
        skill: string,
        name: string,
        employeeAssignments: [{
            employee: {
                firstName: string,
                lastName: string
            }
        }],
        associateAssignments: [{
            associate: {
                firstName: string,
                lastName: string
            }
        }]
    }[];

}

export const initialBatchDetailedState: IBatchDetailedState = {
    batches: [{
        id: 0,
        batchId: "batchId",
        skill: "skill",
        name: "name",
        employeeAssignments: [{
            employee: {
                firstName: "first",
                lastName: "last"
            }
        }],
        associateAssignments: [{
            associate: {
                firstName: "first",
                lastName: "last"
            }
        }]
    }]

}

export const BatchDetailReducer = (action: any, batchDetailedState: IBatchDetailedState = initialBatchDetailedState) => {
    switch (action.type) {
        case SET_BATCHES_DETAILS:
            if (action.payload != null)
                return batchDetailedState = { ...action.payload }  //places batch detailed data into batchCard state
            else
                return batchDetailedState;
        default:
            return batchDetailedState;
    }
}