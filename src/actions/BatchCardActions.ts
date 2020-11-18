import Axios from "axios";
import { IBatchState } from "../_reducers/BatchReducer";

export const SET_BATCHES = "SET_BATCHES";

export const setBatchState = (batchData: any) => ({
    type: SET_BATCHES,
    payload: batchData
});

export const getBatchCardData = (userId:number) => async (dispatch:any) => {

    //get data from server based on user id that was given
    const response = await Axios.get(
        "https://caliber2-mock.revaturelabs.com/mock/training/batch?quarter="+userId
    );

    //individual batch card info
    const batchCardInfo = {
        id: response.data.id,
        skill: response.data.skill,
        name: response.data.name,
    }

    dispatch(setBatchState(batchCardInfo));
};