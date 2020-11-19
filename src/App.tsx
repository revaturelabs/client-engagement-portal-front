
import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import './scss/app.scss';
import './scss/batch-card.scss'
import { Provider } from 'react-redux';
import { store } from './Store';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from './views/LoginPage/LoginPage';
import { HomePage } from './views/HomePage/HomePage';
import { AdminPage } from './views/AdminPage/AdminPage';
import { AssociateCardFactory } from './components/AssociateCard/AssociateCardFactory';

// Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/login" />}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/login-admin" />
            <Route path="/home" component={HomePage}/>
            <Route path="/admin" component={AdminPage}/>
          </Switch>
        </BrowserRouter>
        <AssociateCardFactory />
      </Provider>
      
    </div>
  );
}

export default App;
