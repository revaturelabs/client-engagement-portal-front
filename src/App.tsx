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
import {PrivateAdminRoute} from './components/PrivateRoutes/PrivateAdminRoute';
import {PrivateClientRoute} from './components/PrivateRoutes/PrivateClientRoute';
import {PrivateRoute} from './components/PrivateRoutes/PrivateRoute';

import firebase from "firebase/app";
import "firebase/auth";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseAuthedAnd,
} from "@react-firebase/auth";


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

// {
//     apiKey: "AIzaSyC4sxZlT-McTildwtxa8LV1lj7ZQhzOrs0",
//     authDomain: "training-team-253916.firebaseapp.com",
//     projectId: "training-team-253916",
//     storageBucket: "training-team-253916.appspot.com",
//     messagingSenderId: "492701958610",
//     appId: "1:492701958610:web:4a30a1be93803701d3480b",
//     measurementId: "G-DP6XDH9DTW",
//     databaseURL: "",
// };

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
                            <PrivateClientRoute path="/home" component={HomePage} />
                            <PrivateAdminRoute path="/admin" component={AdminPage} />
                            <PrivateRoute path="/batch/:batchId" component={BatchInformationPage} />
                            <Route path="/loading" component={LoadingPage} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </FirebaseAuthProvider>
        </div>
    );
}

export default App;
