import { Batch } from "./types";
import { axiosInstance } from "./util/axiosConfig";

export const getAdminBatches = async (): Promise<Batch[]> => {
  const axios = await axiosInstance();

  try {
    const res = await axios.get<Batch[]>('/admin/batches');
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getClientBatches = async (userEmail: String): Promise<Batch[]> => {
  const axios = await axiosInstance();

  try {
    const res = await axios.get<Batch[]>(`/client/email/batch/${userEmail}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getSingleBatch = async (batchId: string): Promise<Batch | undefined> => {
  const axios = await axiosInstance();

  try {
    const res = await axios.get<Batch>(`/client/batch/${batchId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
