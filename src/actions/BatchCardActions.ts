import Axios from "axios";
import { IBatchState } from "../_reducers/BatchReducer";

export const SET_BATCHES = "SET_BATCHES";

export const setBatchState = (batchData: any) => ({
    type: SET_BATCHES,
    payload: batchData
});