import { axiosInstance } from './util/axiosConfig';
import { Batch } from './types';
import axios from 'axios';

/**
 * This function gets all of the batch data from our back end. This
 * includes data about each associate's test / quiz scores.
 */
export const getBatchData = async (batchId: string|number) : Promise<Batch|undefined> => {
    try {
        console.log('getting batch data...');
        // const response = await (await axiosInstance())?.get<Batch>("/client/batch/" + batchId);
        const response = await axios.get<Batch>('http://localhost:9011' + "/client/batch/" + batchId);
        console.log('batch data received:');
        response?.data ? console.log(response.data) : console.log('no data');
        if (response?.data) return response.data;
    } catch (error:any) {
        console.log(error);
    }
};