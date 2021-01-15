import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { RootStateOrAny, useSelector } from "react-redux";
import { adminLogin, clientLogin } from "../actions/UserActions";
import { IUserAdmin, IUserClient } from "../_reducers/UserReducer";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../util/axiosConfig";

/**
 * Connection credentials for Firebase client (non-sensitive)
 * @databaseURL this property is required for Firebase App Args,
 * but is not necessary for authentication, thus we leave it empty.
 */
const firebaseConfig = {
  apiKey: "AIzaSyC4sxZlT-McTildwtxa8LV1lj7ZQhzOrs0",
  authDomain: "training-team-253916.firebaseapp.com",
  projectId: "training-team-253916",
  storageBucket: "training-team-253916.appspot.com",
  messagingSenderId: "492701958610",
  appId: "1:492701958610:web:4a30a1be93803701d3480b",
  measurementId: "G-DP6XDH9DTW",
  databaseURL: "",
};

//Prevents starting the default instance multiple times, which can cause errors.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // if you want analytics enabled, un-comment the following line
  // firebase.analytics();
}

/**
 * This component is the Firebase wrapper and should be nested within a redux store provider.
 * It handles authentication by listening for changes to the auth state, which happens when a user logs in or out.
 * It then dispatches those changes to the redux store.
 * Since redux store does not persist across refresh, but Firebase does, this wrapper initializes the listener when the user object is empty.
 * Firebase will load the previous session, which will be dispatched properly to the redux store.
 * User email is stored in Firebase Auth, but user details (names) are stored on the backend, requiring an axios call to retrieve said details.
 * @param props both the firebase app object and firebaseConfig are passed as props for the container.
 * @returns the FirebaseContainer as a wrapper component for the rest of the application that relies on authentication.
 */
const FirebaseContainer = (props: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.userState.user);

  useEffect(() => {
    if (!user) {
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        firebaseUser?.getIdTokenResult(true).then((idTokenResult) => {
          if (idTokenResult.claims.role) {
            axiosInstance().then((i) =>
              i.get("/admin/email/" + idTokenResult.claims.email).then((r) => {
                console.log(r);
                const statefulClient: IUserAdmin = {
                  email: idTokenResult.claims.email || "",
                  firstName: r.data.firstName,
                  lastName: r.data.lastName,
                  role: "admin",
                };

                dispatch(adminLogin(statefulClient));
              })
            );
          } else {
            axiosInstance().then((i) =>
              i.get("/client/email/" + idTokenResult.claims.email).then((r) => {
                const statefulClient: IUserClient = {
                  //retrieved from firebase
                  email: idTokenResult.claims.email || "",
                  //retrieved from backend db
                  companyName: r.data.companyName,
                  role: "client",
                };

                dispatch(clientLogin(statefulClient));
              })
            );
          }
        });
      });
    }
  }, [user]);

  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      {props.children}
    </FirebaseAuthProvider>
  );
};

export default FirebaseContainer;

//Second instantiation of a firebase app, used exclusively for new user creation as a workaround
const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
/**
 * This handles the creation of new users (Admins and Clients.)
 * Firebase immediately logs in a new user when it is created.
 * Unfortunately, there is no native solution to this problem.
 * So in the case of our app, we must create a secondary firebase instance to handle sign-up,
 * otherwise the new users created will override the currently authenticated user's session.
 * This function uses the secondary firebase app instance exclusively.
 * @param email the email used for creating a new Firebase user.
 * @param password password for the new Firebase user.
 */
export const signUp = (email: string, password: string) => {
  secondaryApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  secondaryApp.auth().signOut();
};
