import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";

//demo config; NOT william's config.
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
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      {props.children}
    </FirebaseAuthProvider>
  );
};

export default FirebaseContainer;
