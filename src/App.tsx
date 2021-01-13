import React from "react";
import "./scss/app.scss";
import "./scss/batch-card.scss";
import { Provider } from "react-redux";
import { store } from "./Store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginPage } from "./views/LoginPage/LoginPage";
import HomePage from "./views/HomePage/HomePage";
import LoadingPage from "./views/LoadingPage/LoadingPage";

import { AdminPage } from "./views/AdminPage/AdminPage";
import BatchInformationPage from "./views/BatchInformationPage/BatchInformationPage";
import { PrivateAdminRoute } from "./components/PrivateRoutes/PrivateAdminRoute";
import { PrivateClientRoute } from "./components/PrivateRoutes/PrivateClientRoute";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute";
import { MessagesPage } from "./views/MessagesPage/MessagesPage";

import FirebaseContainer from "./util/FirebaseContainer";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <FirebaseContainer>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/login" component={LoginPage} />
              <PrivateClientRoute path="/home" component={HomePage} />
              <PrivateAdminRoute path="/admin" component={AdminPage} />
              <PrivateRoute
                path="/batch/:batchId"
                component={BatchInformationPage}
              />
              <Route path="/messages" component={MessagesPage} />
              <Route path="/loading" component={LoadingPage} />
            </Switch>
          </BrowserRouter>
        </FirebaseContainer>
      </Provider>
    </div>
  );
}

export default App;
