export const SET_BATCHES = "SET_BATCHES";

export const setBatchState = (batchData: any) => ({
    type: SET_BATCHES,
    payload: batchData
});


/**
 * This defines the action type.
 */
export const SET_BATCHES_DETAILS = "SET_BATCHES_DETAILS";

/**
 * This defines the action.
 * @param batchDetailData this will be details about a batch. 
 */
export const setBatchDetailsState = (batchDetailData: any) => ({
    type: SET_BATCHES_DETAILS,
    payload: batchDetailData
})
