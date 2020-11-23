import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router";

//Props for RouterGuard. Expected to be in a BrowserRouter Switch, so extends RouteProps
export interface ProtectedRouteProps extends RouteProps {
  role: string[]; //allowed roles
  redirectPath: string; //path to redirect to if fail
}

export const RouterGuard: React.FC<ProtectedRouteProps> = (props) => {
  const [redirect, setRedirect] = useState<string>("");
  const [userRole, setUserRole] = useState<string>(""); // if not yet loaded (Auth not done yet), then falsy

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
