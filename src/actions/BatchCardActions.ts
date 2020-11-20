import Axios from "axios";
import { IBatchState } from "../_reducers/BatchReducer";

export const SET_BATCHES = "SET_BATCHES";

export const setBatchState = (batchData: any) => ({
    type: SET_BATCHES,
    payload: batchData
});

//Jordan code below

export const SET_BATCHES_DETAILS = "SET_BATCHES_DETAILS";

export const setBatchDetailsState = (batchDetailData: any) => ({
    type: SET_BATCHES_DETAILS,
    payload: batchDetailData
})