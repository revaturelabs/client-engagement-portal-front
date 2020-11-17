import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginComponent } from '../../components/LoginComponent/LoginComponent';
import logo from '../../assets/logo.png';

export const LoginPage:React.FC<undefined> = () => {
    return(
        <table style={{height: "100vh", width: "100vw", backgroundColor:"#B9B9BA"}}>
            <tbody>
                <tr>
                    <td>
                        <div className="justify-content-center" style={{textAlign:"center"}}>
                            <Link to="/login"><img src={logo} alt="Logo" style={{opacity: 0.2}} height="100px" /></Link>
                            <br />
                            <br />
                            <LoginComponent loginType="client" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}