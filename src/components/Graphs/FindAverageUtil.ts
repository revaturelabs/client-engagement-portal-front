/** 
* This is a reducer function that finds the average in an
* array of numbers.
*/
export const findAverage = (arr: number[]) => arr.reduce((a, c) => a+c, 0)/arr.length;