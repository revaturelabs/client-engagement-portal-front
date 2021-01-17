import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { RootStateOrAny, useSelector } from 'react-redux';
import { adminLogin, clientLogin } from '../actions/UserActions';
import { IUserAdmin, IUserClient } from "../_reducers/UserReducer";
import { useDispatch } from 'react-redux';
import { axiosInstance } from './axiosConfig';

const firebaseConfig = {
  apiKey: "AIzaSyC4sxZlT-McTildwtxa8LV1lj7ZQhzOrs0",
  authDomain: "training-team-253916.firebaseapp.com",
  projectId: "training-team-253916",
  storageBucket: "training-team-253916.appspot.com",
  messagingSenderId: "492701958610",
  appId: "1:492701958610:web:4a30a1be93803701d3480b",
  measurementId: "G-DP6XDH9DTW",
  databaseURL: ""
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // if you want analytics enabled, un-comment the following line
  // firebase.analytics();
}

const FirebaseContainer = (props: any) => {

  const dispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.userState.user);

  useEffect(() => {
    if (!user) {
      firebase.auth().onAuthStateChanged((firebaseUser) => {

        firebaseUser?.getIdTokenResult(true).then((idTokenResult)=> {
          if (idTokenResult.claims.role) {
            
            axiosInstance()
            .then((i) => i.get('/admin/email/' + idTokenResult.claims.email)
                .then((r) => {
                    console.log(r)
                    const statefulClient: IUserAdmin = {
                        email: idTokenResult.claims.email || "",
                        firstName: r.data.firstName,
                        lastName: r.data.lastName,
                        role: "admin"
                    }
                    dispatch(adminLogin(statefulClient));

                }));

          } else {

            axiosInstance()
            .then((i) => i.get('/client/email/' + idTokenResult.claims.email)
                .then((r) => {
                    const statefulClient: IUserClient = {
                        //retrieved from firebase
                        email: idTokenResult.claims.email || "",
                        //retrieved from backend db
                        companyName: r.data.companyName,
                        role: "client"
                    }
                    
                    dispatch(clientLogin(statefulClient));

                }))
          }
        })
      })
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig} >
      {props.children}
    </FirebaseAuthProvider>
  );
};

export default FirebaseContainer;

const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
export const signUp = (email: string, password: string) => {
  secondaryApp.auth().createUserWithEmailAndPassword(email, password)
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });

  secondaryApp.auth().signOut();
}