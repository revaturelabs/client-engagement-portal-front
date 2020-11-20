import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
// import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from "react-router";

//Props for RouterGuard. Expected to be in a BrowserRouter Switch, so extends RouteProps
export interface ProtectedRouteProps extends RouteProps {
  role: string[]; //allowed role
  redirectPath: string; //path to redirect to if fail
}

export const RouterGuard: React.FC<ProtectedRouteProps> = (props) => {
  const [redirect, setRedirect] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getUser() {
      const userInfo = await Auth.currentUserInfo();    //get current user

      setUserRole(userInfo.attributes["custom:userRole"] || ""); 
      
      console.log(userRole);
      if (!props.role.includes(userRole) && loaded) {      // if the current user role is not one of the allowed roles, then redirect
        setRedirect(props.redirectPath);
      }
      setLoaded(true);
    }
    !loaded && getUser();    //run only if not yet loaded
  });
  
  

  if (loaded) {                                         //If the page is loaded...
    if (redirect) {                                     //if the user role is not correct, return redirect
      const renderComponent = () => <Redirect to={{ pathname: redirect }} />;
      return <Route {...props} component={renderComponent} render={undefined} />;
    } else {                                                //else return route normally
      return <Route {...props} />;
    }
  } else {                                              //else don't load
    return <div>Loading</div>;
  }
};

export default RouterGuard;
