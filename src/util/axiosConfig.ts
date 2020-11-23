import Axios from "axios";
import { Auth } from "aws-amplify";

//This requires an Async function to parse the current JWT token due to promises
const getAxiosHeader = async () => {

  //Assigns the current session promise
  const sessionPromise = (Auth.currentSession());
  //Awaits the promise to fufill, then triggers and axios
  return await sessionPromise.then(function (result) {
    //Grabs the JWT token from the promise
    return result.getIdToken().getJwtToken();
  });
}



/**
 * Our Axios Instances need to wait on the token that we get
 * from the CognitoUserSession.  Once we get the token,
 * we can proceed to make the requests.  This instance refers
 * to the endpoints / resource server hosted on an AWS EC2.
 * Sample code for achieveing a new instance:
 * axiosInstance().then(function (result) {
    result.get('/admin/')
      .then((res) => {
        console.log(res.data)
      })}
 */
export const axiosInstance = async () => {
  const token = getAxiosHeader().then(function (result) { return result });
  return Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: { 'Authorization': `Bearer ${token}` },

  });
}
