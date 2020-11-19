import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import hands from '../../assets/engagementPortalLogo.svg';
import userThumb from '../../assets/user-thumb.png';
import passThumb from '../../assets/pass-thumb.png';
import { Auth } from 'aws-amplify';
import Axios from 'axios';

interface ILoginProps {
    loginType: string
}

export const LoginComponent: React.FC<ILoginProps> = (props: ILoginProps) => {


    const [isClient, setClient] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    // WHEN THE LOGIN BUTTON IS PRESSED
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
            // const startTime = Date.now();

            const user = // !!!EMAIL WILL BE RETURNED IN: user.attributes.email
                await Auth.signIn(loginCredentials.email, loginCredentials.password);
            // THIS OPERATION COSTS ~800 MILLISECONDS
            console.log(user);



            // Switch statement for assigning what page to redirect to based upon what role the user has
            switch (user.attributes["custom:userRole"]) {
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

            // await console.log(user.userSession);
            // const midTime = Date.now();

            // console.log(midTime - startTime);

            // await Auth.signOut();

            // console.log(Date.now() - midTime);
        } catch (error) {
            console.log("Couldn't sign in: ", error);
        }

    }

    return (
        <>
            {isClient ? <Redirect to="/home" /> : isAdmin ? <Redirect to="/admin" /> :
                <form onSubmit={handleSubmit}
                    style={{
                        textAlign: "center", backgroundColor: "white", width: "15vw", height: "32vh", minWidth: "200px", display: "inline-block",
                        borderRadius: "50px", padding: "10px", border: "1px solid #F26925"
                    }}>

                    <div style={{ maxHeight: "90%" }}>
                        <div style={{ position: "relative", textAlign: "center" }}>
                            <img src={hands} alt="hands background" style={{ width: "45%", minHeight: "6em", opacity: 0.2 }} />
                            <div className="logoarea"
                                style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} >

                                <div
                                    style={{ color: "#202430", fontSize: "20px", fontWeight: 500 }}>

                                    Engagement Force
                                </div>
                            </div>
                        </div>

                        <div style={{ position: "relative" }}>
                            <input type="email" required className="form-control" name="email" placeholder="E-mail"
                                style={new CEPLoginInputStyle()} />
                            <div style={{ position: "absolute", top: "45%", left: "21%", transform: "translate(-50%, -50%)" }}>
                                <img src={userThumb} alt="email thumbnail" />
                            </div>
                        </div>

                        <div style={{ position: "relative" }}>
                            <input type="password" required className="form-control" name="password" placeholder="Password"
                                style={new CEPLoginInputStyle()} />
                            <div style={{ position: "absolute", top: "45%", left: "21%", transform: "translate(-50%, -50%)" }}>
                                <img src={passThumb} alt="password thumbnail" />
                            </div>
                        </div>

                        <button type="submit"
                            style={{ margin: "10px", lineHeight: 2.2, width: "70%", border: "none", backgroundColor: "#F26925", color: "white", fontSize: "20px" }}>

                            Login
                        </button>
                    </div >
                </form >
            }
        </>
    );
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
        this.boxShadow = "inset 1px 2px 0 0 #ccc, inset 0 4px 0 0 #ddd, inset 2px 6px 0 0 #eee";
    }
}
