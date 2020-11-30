import React from 'react';
import { Link } from 'react-router-dom';
import { LoginComponent } from '../../components/LoginComponent/LoginComponent';
import logo from '../../assets/logo.png';
import "../../scss/loginStyles.scss";

/**
 * @function LoginPage
 * The page the user sees when they arrive onto the site.
 */
export const LoginPage:React.FC<undefined> = () => {
    return(
        <div className="login-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <img src={logo} alt="Logo" className="logo"/>
                </div>
            </div>
            
            <br />
            <br />
            <LoginComponent loginType="client" />
            <br />
            <br />
<<<<<<< HEAD
=======
{/*     DEVELOPER links to log-in without Cognito          
            <Link to="/home"><button>Log In As Client</button></Link>
            <Link to="/admin"><button>Log In As Admin</button></Link> */}
>>>>>>> 8fed70a852306b703095842ae263ba4e638ea7f4
        </div>
    );
}
