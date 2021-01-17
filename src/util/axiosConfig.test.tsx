import { axiosInstance } from './axiosConfig';

import firebase from 'firebase/app'
import 'firebase/auth'
import {firebaseConfig} from './FirebaseContainer'

let testApp: firebase.app.App;

beforeAll(() => {
    testApp = firebase.initializeApp(firebaseConfig, "testing");
});
/**
   * @Test
   * Axios Config File
   */
it("Returns an axios with correct URL", async () => {

    let axiosPromise: any;
    axiosPromise = await axiosInstance();
    let baseURL: string = axiosPromise.defaults.baseURL;

    expect(baseURL).toBe(process.env.REACT_APP_BACKEND_API);
});