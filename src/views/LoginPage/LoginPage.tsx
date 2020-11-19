import React from 'react';
import { Link } from 'react-router-dom';
import { LoginComponent } from '../../components/LoginComponent/LoginComponent';
import logo from '../../assets/logo.png';
import "../../scss/loginStyles.scss";

export const LoginPage:React.FC<undefined> = () => {
    return(
        <div className="login-wrapper">
            <img src={logo} alt="Logo" className="logo"/>
            <br />
            <br />
            <LoginComponent loginType="client" />
            <br />
            <br />
            <Link to="/home"><button>Log In As Client</button></Link>
            <Link to="/admin"><button>Log In As Admin</button></Link>
        </div>
    );
}