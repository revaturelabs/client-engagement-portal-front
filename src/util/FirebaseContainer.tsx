import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";

//demo config; NOT william's config.
const firebaseConfig = {
  apiKey: "AIzaSyD_ybaiHaGC0LobWwODnBwS9hKYg1ltOcs",
  authDomain: "fir-demo-1c557.firebaseapp.com",
  projectId: "fir-demo-1c557",
  storageBucket: "fir-demo-1c557.appspot.com",
  messagingSenderId: "68185354875",
  appId: "1:68185354875:web:e01f97050875f4b97228de",
  measurementId: "G-L9CB6SL6NL",
  databaseURL: "",
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
