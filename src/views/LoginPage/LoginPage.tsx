import React from 'react';
import { Link } from 'react-router-dom';
import { LoginComponent } from '../../components/LoginComponent/LoginComponent';
import logo from '../../assets/logo.png';
import "../../scss/loginStyles.scss";

/**
 * @function LoginPage
 * The page the user sees when they arrive onto the site.
 */
export const LoginPage: React.FC<undefined> = () => {
    return (
        <div className="login-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
            </div>

            <br />
            <br />
            <LoginComponent loginType="client" />
            <br />
            <br />
        </div>
    );
}
