import React from 'react';
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';
import './scss/app.scss';
import './scss/batch-card.scss';
import { Provider } from 'react-redux';
import { store } from './Store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginPage } from './views/LoginPage/LoginPage';
import HomePage from './views/HomePage/HomePage';
import LoadingPage from './views/LoadingPage/LoadingPage';

import { AdminPage } from './views/AdminPage/AdminPage';
import BatchInformationPage from './views/BatchInformationPage/BatchInformationPage';
// import { RedirectWhenLoggedIn } from './util/redirectWhenLoggedIn';

import firebase from "firebase/app";
import "firebase/auth";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseAuthedAnd,
} from "@react-firebase/auth";


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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // if you want analytics enabled, un-comment the following line
    // firebase.analytics();
}

// Amplify.configure(awsconfig);

function App() {
    return (
        <div className="App">
            <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
                <Provider store={store}>
                    <BrowserRouter>
                        {/* <RedirectWhenLoggedIn /> */}
                        
                        <FirebaseAuthConsumer>
                            {({ isSignedIn, user, providerId }) => {
                                return (
                                    <pre style={{ height: 300, overflow: "auto" }}>
                                        {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                                    </pre>
                                    // (isSignedIn) ? <Route path="/home" /> : <Route path="/login" />
                                );
                            }}
                        </FirebaseAuthConsumer>
                        <Switch>
                            <Route exact path="/" component={LoadingPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/home" component={HomePage} />
                            <Route path="/admin" component={AdminPage} />
                            <Route path="/batch/:batchId" component={BatchInformationPage} />
                            <Route path="/loading" component={LoadingPage} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </FirebaseAuthProvider>
        </div>
    );
}

export default App;
