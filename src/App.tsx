import React from 'react';
import logo from './logo.svg';
import './scss/app.scss';
import { Provider } from 'react-redux';
import { AnyAction } from 'redux';
import { store } from './Store';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from './views/LoginPage/LoginPage';
import HomePage from './views/HomePage/HomePage';
import {AdminPage} from './views/AdminPage/AdminPage';

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
      </Provider>
    </div>
  );
}

export default App;
