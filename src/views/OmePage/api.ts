import { Batch } from "./types";
import { axiosInstance } from "../../util/axiosConfig";

export const getAdminBatches = async (): Promise<Batch[]> => {
  let batches = [] as Batch[];
  await axiosInstance().then((result) => {
    result
      .get("/admin/batches")
      .then((response: any) => {
        if (response != null) {
          //individual batch info is placed into the array from above
          for (const batchData of response.data) {
            const batchCardInfo = { ...batchData };
            batches.push(batchCardInfo);
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  return batches as Batch[];
};

export const getClientBatches = async (userEmail: String): Promise<Batch[]> => {
  let batches = [] as Batch[];
  await axiosInstance().then((result) => {
    result
      .get("/client/email/batch/" + userEmail)
      .then((response: any) => {
        if (response != null) {
          //individual batch info is placed into the array from above
          for (const batchData of response.data) {
            const batchCardInfo = { ...batchData };
            batches.push(batchCardInfo);
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  return batches as Batch[];
};

export const getSingleBatch = async (batchId: string): Promise<Batch | undefined> => {
  let batch;
  await axiosInstance().then((result) => {
    result
      .get("/client/batch/" + batchId)
      .then((response: any) => {
        if (response != null) {
          batch = response.data;
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  return batch as any as Batch;
};
