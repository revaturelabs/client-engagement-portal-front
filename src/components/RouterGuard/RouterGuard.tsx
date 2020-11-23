import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router";

//Props for RouterGuard. Expected to be in a BrowserRouter Switch, so extends RouteProps
export interface ProtectedRouteProps extends RouteProps {
  role: string[]; //allowed roles
  redirectPath: string; //path to redirect to if fail
}

/**
 * @function RouterGuard
 * Component that acts as a router guard for a BrowserRouter switch case.
 *
 * @param role an array of allowed roles that can access the route
 * @param redirectPath a string that defines which route to redirect to if not authorized
 * @param component component to render
 * @param path route path
 */
export const RouterGuard: React.FC<ProtectedRouteProps> = (props) => {
  const [redirect, setRedirect] = useState<string>("");
  const [userRole, setUserRole] = useState<string>(""); // if not yet loaded (Auth not done yet), then falsy

  /**
   * @function getUser
   * Gets the currently signed in user info
   *
   * @async
   * makes a call to AWS Cognito to get current user info
   *
   * @event ComponentDidMount
   * runs when the component is first loaded.
   */
  useEffect(() => {
    async function getUser() {
      const userInfo = await Auth.currentUserInfo(); //get current user
      const user = userInfo?.attributes["custom:userRole"] || "NotSignedIn";

      if (userInfo && !props.role.includes(user)) {
        // if the current user role is not one of the allowed roles, then redirect
        setRedirect(props.redirectPath);
      }
      setUserRole(user); //set UserRole to be the found user. We know it's fine bec of await.
    }
    !userRole && getUser(); //run only if not yet loaded
  });

  if (userRole) {
    //If the page is loaded...
    if (redirect || userRole === "NotSignedIn") {
      //if the user role is not correct, return redirect
      const renderComponent = () => <Redirect to={{ pathname: redirect }} />;
      return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
      //else return route normally
      return <Route {...props} />;
    }
  } else {
    //else don't load
    return null;
  }
};

export default RouterGuard;
