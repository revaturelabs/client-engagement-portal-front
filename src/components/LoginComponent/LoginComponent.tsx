import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import userThumb from '../../assets/user-thumb.png';
import passThumb from '../../assets/pass-thumb.png';
import { Auth } from 'aws-amplify';
import  '../../scss/loginStyles.scss';
import ceplogo2 from '../../assets/engagementPortalLogov2.svg';

interface ILoginProps {
    loginType: string
}

/**
 * @function LoginComponent
 * Component that allows login functionality. Takes in an email and password.
 *
 * @param props (DEPRECATED USAGE) Informs whether this component is rendered on the admin login or the client login.
 */
export const LoginComponent: React.FC<ILoginProps> = (props: ILoginProps) => {

    const [isClient, setClient] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    /**
     * @function handleSubmit
     * Handles authentication after the user presses the login button.
     * @async
     * Makes a call to AWS Cognito to authenticate login details,
     *  then makes a call to the API gateway to retrieve user info.
     *
     * @param event contains the click event that calls this function.
     */
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false)
            event.stopPropagation();

        const loginCredentials = {
            email: form["email"].value,
            password: form["password"].value
        }

        try {
            const user = await Auth.signIn(loginCredentials.email, loginCredentials.password); // user.attributes.email contains the user email
            
            

            switch (user.attributes["custom:userRole"]) { // Assigns what page to redirect to based upon what role the user has
            case "client":
                setAdmin(false);
                setClient(true);
                break;
            case "admin":
                setClient(false);
                setAdmin(true);
                break;
            default:
                setClient(false);
                setAdmin(false);
            }
        } catch (error) {
            console.log("Couldn't sign in: ", error);
        }

    }

<<<<<<< HEAD
    return(
            <>
            {isValidated ? <Redirect to="/home" /> :
                <form onSubmit={handleSubmit}
                    style={{textAlign: "center", backgroundColor: "white", width: "15vw", height: "32vh", minWidth:"200px", display: "inline-block",
                            borderRadius: "50px", padding: "10px", border: "1px solid #F26925"}}>
                
                    <div style={{maxHeight: "90%"}}>
                        <div style={{position: "relative", textAlign: "center"}}>
                            <Link to="/login"><img src={hands} alt="hands" style={{width: "60%", minHeight: "6em", opacity: 0.1}} /></Link>
                            <div className="logoarea"
                                style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} >

                                <div
                                    className = "test1" style={{ color: "#202430", fontSize: "20px", fontWeight:500 }}>    
                                    Engagement Force
                                </div>
=======
    return (
        <>
            {isClient ? <Redirect to="/home" /> : isAdmin ? <Redirect to="/admin" /> :
                <form onSubmit={handleSubmit} className="login-form">

                <div style={{maxHeight: "90%"}}>
                    <div style={{position: "relative", textAlign: "center"}}>
                        <div className="login-header">
                            Client Engagement Portal
                        </div>
                        <div className="cep-logo-area">
                            <img src={ceplogo2} alt="cep-logo" width="200px"/>
>>>>>>> 72a8fc8243ed44954d401029a1db8e8afbff3f81
                            </div>
                        </div>

                        <div style={{ position: "relative" }}>
                            <input type="email" required className="form-control" name="email" placeholder="E-mail"
<<<<<<< HEAD
                                style={new CEPLoginInputStyle()}/>
                            <div style={{position: "absolute", top: "45%", left: "21%", transform: "translate(-50%, -50%)"}}>
                                <img src={userThumb} alt="email-thumbnail" className="userthumbcheck"/>
=======
                                style={new CEPLoginInputStyle()} />
                            <div style={{ position: "absolute", top: "45%", left: "21%", transform: "translate(-50%, -50%)" }}>
                                <img src={userThumb} alt="email thumbnail" className="userthumbcheck" />
>>>>>>> 72a8fc8243ed44954d401029a1db8e8afbff3f81
                            </div>
                        </div>

                        <div style={{ position: "relative" }}>
                            <input type="password" required className="form-control" name="password" placeholder="Password"
                                style={new CEPLoginInputStyle()} />
<<<<<<< HEAD
                            <div style={{position: "absolute", top: "45%", left: "21%", transform: "translate(-50%, -50%)"}}>
                                <img src={passThumb} alt="password-thumbnail" className= "passthumbcheck" />
                            </div>
                        </div>
    
                        <button className="test2" type="submit"
                            style={{margin: "10px", lineHeight: 2.2, width: "70%", border:"none", backgroundColor:"#F26925", color:"white", fontSize:"20px"}}>Login</button>
                    </div>
                </form>
            }
            </>
      );
=======
                            <div style={{ position: "absolute", top: "45%", left: "21%", transform: "translate(-50%, -50%)" }}>
                                <img src={passThumb} alt="password thumbnail" className= "passthumbcheck" />
                            </div>
                        </div>

                        <button className="test2" type="submit"
                            style={{ margin: "10px", lineHeight: 2.2, width: "70%", border: "none", backgroundColor: "#F26925", color: "white", fontSize: "20px" }}>

                            Login
                        </button>
                    </div >
                </form >
            }
        </>
    );
>>>>>>> 72a8fc8243ed44954d401029a1db8e8afbff3f81
}

export class CEPLoginInputStyle implements React.CSSProperties {
    lineHeight: number;
    paddingLeft: string;
    borderRadius: string;
    margin: string;
    width: string;
    display: string;
    boxShadow: string;

    constructor() {
        this.lineHeight = 2.2;
        this.paddingLeft = "30px";
        this.borderRadius = "5px";
        this.margin = "2px";
        this.width = "70%";
        this.display = "inline-block"
        this.boxShadow = "inset 1px 2px 0 0 #ddd, inset 0 4px 0 0 #eee, inset 2px 6px 0 0 #fef";
    }
}
