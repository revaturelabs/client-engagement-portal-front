import Axios from "axios";
import firebase from 'firebase/app'
import 'firebase/auth'

//This requires an Async function to parse the current JWT token due to promises
const getAxiosHeader = async () => {
  const result = await firebase.auth().currentUser?.getIdToken(true).then((resp) => resp);
  return result;

}

/**
 * Our Axios Instances need to wait on the token that we get
 * from the Firebase SDK.
 * Once we get the token, we can proceed to make the requests.
 * This instance refers to the endpoints / resource server hosted on an AWS EC2.
 * Sample code for achieveing a new instance:
 * axiosInstance().then(function (result) {
    result.get('/admin/')
      .then((res) => {
        console.log(res.data)
      })}
 */
export const axiosInstance = async () => {
  const token = await getAxiosHeader();

  return Axios.create({

    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: { tokenId: token },

  });
}
