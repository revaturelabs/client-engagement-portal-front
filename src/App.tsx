import React from 'react';
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

import FirebaseContainer from './util/FirebaseContainer'

function App() {
    return (
        <div className="App">
            <FirebaseContainer>
                <Provider store={store}>
                    <BrowserRouter>                        
                        <Switch>
                            <Route exact path="/" component={LoginPage} />
                            <Route path="/login" component={LoginPage} />
                            <PrivateClientRoute path="/home" component={HomePage} />
                            <PrivateAdminRoute path="/admin" component={AdminPage} />
                            <PrivateRoute path="/batch/:batchId" component={BatchInformationPage} />
                            <Route path="/loading" component={LoadingPage} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </FirebaseContainer>
        </div>
    );
}

export default App;
