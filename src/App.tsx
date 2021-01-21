import React from "react";
import "./scss/app.scss";
import { Provider } from "react-redux";
import { store } from "./Store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FirebaseContainer from "./util/FirebaseContainer";
import { LoginPage } from "./views/LoginPage/LoginPage";
import LoadingPage from "./views/LoadingPage/LoadingPage";
import { AdminPage } from "./views/AdminPage/AdminPage";
import { PrivateAdminRoute } from "./components/PrivateRoutes/PrivateAdminRoute";
import HomePage from "./views/HomePage/HomePage";
import BatchInfoPage from "./views/BatchInfoPage/BatchInfoPage";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute";
import { MessagesPage } from "./views/MessagesPage/MessagesPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <FirebaseContainer>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/login" component={LoginPage} />
              <PrivateRoute path="/home" component={HomePage} />
              <PrivateRoute path="/batch/:batchId" component={BatchInfoPage} />
              <PrivateAdminRoute path="/admin" component={AdminPage} />
              <PrivateRoute path="/messages" component={MessagesPage} />
              <Route path="/loading" component={LoadingPage} />
            </Switch>
          </BrowserRouter>
        </FirebaseContainer>
      </Provider>
    </div>
  );
}

export default App;
