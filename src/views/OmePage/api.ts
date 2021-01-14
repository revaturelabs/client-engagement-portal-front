import { Batch } from './types';
import dummyBatches from './dummyBatches.json';

export const getDummyBatches = async (): Promise<Batch[]> => {
  await new Promise(res => setTimeout(res, 500));
  return dummyBatches as any as Batch[];
}

export const getClientBatches = async (userEmail: String): Promise<Batch[]> => {
  await new Promise(res => setTimeout(res, 500));
  return [dummyBatches[1],dummyBatches[2]] as any as Batch[];
}

export const getSingleBatch = async (batchId: string):
    Promise<Batch | undefined> => {
  await new Promise(res => setTimeout(res, 500));
  const batches = dummyBatches as any as Batch[];
  return batches.find(b => b.batchId === batchId);
}