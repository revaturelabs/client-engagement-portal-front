import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import './scss/app.scss';
import { Provider } from 'react-redux';
import { store } from './Store';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from './views/LoginPage/LoginPage';
import HomePage from './views/HomePage/HomePage';
import { AdminPage } from './views/AdminPage/AdminPage';
import { PageNotFound } from "./views/PageNotFound/PageNotFound";
import { BatchInformationPage } from "./views/BatchInformationPage/BatchInformationPage";

Amplify.configure(awsconfig);

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
              <Route path="/batch" component={BatchInformationPage} />
              <Route component={PageNotFound} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }

export default App;

// function App(userInfo: IProp) {
//     return (
//         <div className="App">
//             <BrowserRouter>
//                 <Switch>
//                     <Route
//                         exact
//                         path="/"
//                         component={() => <Redirect to="/login" />}
//                     />
//                     <Route path="/login" component={LoginPage} />
//                     <Route path="/login-admin" />
//                     {userInfo.role === "client" && (
//                         <Route path="/home" component={HomePage} />
//                     )}
//                     {userInfo.role === "admin" && (
//                         <Route path="/admin" component={AdminPage} />
//                     )}
//                     <Route path="/batch" component={BatchInformationPage} />
//                     <Route component={PageNotFound} />
//                 </Switch>
//             </BrowserRouter>
//         </div>
//     );
// }

// const mapStateToProps = (appState: any) => {
//     return {
//         role: appState.roleState?.role,
//     };
// };

// export default connect<IProp>(mapStateToProps)(App);
