export const SET_BATCHES = "SET_BATCHES";

export const setBatchState = (batchData: any) => ({
    type: SET_BATCHES,
    payload: batchData
});
