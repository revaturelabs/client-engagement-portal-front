import { axiosInstance } from './util/axiosConfig';
import { Batch } from './types';

/**
 * This function gets all of the batch data from our back end. This
 * includes data about each associate's test / quiz scores.
 */
export const getBatchData = async (batchId: string|number) : Promise<Batch|undefined> => {
    try {
        const { data } = await (await axiosInstance()).get<Batch>("/client/batch/" + batchId);
        return data;
    } catch (error:any) {
        console.log(error);
    }
};