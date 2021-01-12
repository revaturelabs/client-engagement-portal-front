import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
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
import { RedirectWhenLoggedIn } from './util/redirectWhenLoggedIn';



// Amplify.configure(awsconfig);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    {/* <RedirectWhenLoggedIn /> */}
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
        </div>
    );
}

export default App;
