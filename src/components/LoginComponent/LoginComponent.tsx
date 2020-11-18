import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import hands from '../../assets/hands-cropped.png';
import userThumb from '../../assets/user-thumb.png';
import passThumb from '../../assets/pass-thumb.png';
import { Form } from 'reactstrap';

interface ILoginProps{
    loginType:string
}

export const LoginComponent:React.FC<ILoginProps> = (props:ILoginProps) => {

    const [isValidated, setValidated] = useState(false);

    // WHEN THE LOGIN BUTTON IS PRESSED
    const handleSubmit = (event:any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() === false)
            event.stopPropagation();

        const loginCredentials = {
            email: form["email"].value,
            password: form["password"].value
        }

        // THIS SHOULD ONLY RUN IF THE LOGIN IS VALID; THIS WILL REDIRECT TO HOME.
        setValidated(true);
    }

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
                                style={{ color: "#202430", fontSize: "20px", fontWeight:500 }}>
                                
                                Engagement Force
                            </div>
                        </div>
                    </div>

                    <div style={{position: "relative"}}>
                        <input type="email" required className="form-control" name="email" placeholder="E-mail"
                            style={new CEPLoginInputStyle()}/>
                        <div style={{position: "absolute", top: "45%", left: "21%", transform: "translate(-50%, -50%)"}}>
                            <img src={userThumb} alt="email-thumbnail" />
                        </div>
                    </div>

                    <div style={{position: "relative"}}>
                        <input type="password" required className="form-control" name="password" placeholder="Password"
                            style={new CEPLoginInputStyle()} />
                        <div style={{position: "absolute", top: "45%", left: "21%", transform: "translate(-50%, -50%)"}}>
                            <img src={passThumb} alt="password-thumbnail" />
                        </div>
                    </div>

                    <button type="submit"
                        style={{margin: "10px", lineHeight: 2.2, width: "70%", border:"none", backgroundColor:"#F26925", color:"white", fontSize:"20px"}}>Login</button>
                </div>
            </form>
            }
            </>
    );
}

export class CEPLoginInputStyle implements React.CSSProperties{
    lineHeight:number;
    paddingLeft:string;
    borderRadius:string;
    margin:string;
    width:string;
    display:string;
    boxShadow:string;

    constructor(){
        this.lineHeight = 2.2;
        this.paddingLeft = "30px";
        this.borderRadius = "5px";
        this.margin = "2px";
        this.width = "70%";
        this.display = "inline-block"
        this.boxShadow = "inset 1px 2px 0 0 #ddd, inset 0 4px 0 0 #eee, inset 2px 6px 0 0 #fef";
    }
}