import React from 'react';
import './scss/app.scss';
import './scss/batch-card.scss';
import { Provider } from 'react-redux';
import { store } from './Store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FirebaseContainer from './util/FirebaseContainer'
import { LoginPage } from './views/LoginPage/LoginPage';
import LoadingPage from './views/LoadingPage/LoadingPage';
import { AdminPage } from './views/AdminPage/AdminPage';
import { PrivateAdminRoute } from './components/PrivateRoutes/PrivateAdminRoute';
import HomePage from './views/OmePage/HomePage';
import BatchInfoPage from './views/BatchInfoPage/BatchInfoPage';
// import HomePage from './views/HomePage/HomePage';
// import BatchInformationPage from './views/BatchInformationPage/BatchInformationPage';
// import { PrivateClientRoute } from './components/PrivateRoutes/PrivateClientRoute';
// import { PrivateRoute } from './components/PrivateRoutes/PrivateRoute';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <FirebaseContainer>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={LoginPage} />

                            <Route path="/login" component={LoginPage} />
                            <Route path="/home" component={HomePage}/>
                            {/*<PrivateClientRoute path="/home" component={HomePage} />*/}
                            <Route path="/batch/:batchId" component={BatchInfoPage}/>
                            {/*<PrivateRoute path="/batch/:batchId" component={BatchInformationPage} />*/}
                            <PrivateAdminRoute path="/admin" component={AdminPage} />
                            <Route path="/loading" component={LoadingPage} />
                        </Switch>
                    </BrowserRouter>
                </FirebaseContainer>
            </Provider>
        </div>
    );
}

export default App;
