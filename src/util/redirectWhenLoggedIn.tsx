import { Auth } from "aws-amplify";
import { Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


export const RedirectWhenLoggedIn: React.FC = () => {

    const [link, setLink] = useState("/");
    const redirectWhenLoggedIn = async () => {
        const session = await Auth.currentSession()
        .then(function (val) { 
            return val 
        }).catch(function (val) { 
            return val 
        });

        if (session !== "No current user") {
            const userRole = await Auth.currentUserInfo()
            .then(function (result) { 
                return result.attributes["custom:userRole"] 
            })
            if (userRole === "admin") {
                return "/admin"
            }
            else if (userRole === "client") {
                return "/home"
            }
        }
        return "/login";
    }
    useEffect(() => {
        async function get() {
            setLink(await redirectWhenLoggedIn());
        }
        get();
    }
    )

    return (
        <>{<Redirect to={link} />}</>
    )

}


//Props for RouterGuard. Expected to be in a BrowserRouter Switch, so extends RouteProps
