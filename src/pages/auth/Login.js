import React, { useState } from "react";
import authService from "../../services/auth-service";
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [apiError, setApiError] = useState("");

    const handleUsername = e => {
        setUsernameError("");
        setUsername(e.target.value);
    }   

    const handlePassword = e => {
        setPasswordError("");
        setPassword(e.target.value);
    }  

    const signIn = () =>{
        if(!username){
            setUsernameError("Username is required!");
        }
        if(!password){
            setPasswordError("Password is required!");
        }
        if(!usernameError && !passwordError){
            let a = authService.login(username,password);
            console.log(a)
            if(!localStorage.getItem("id")){
                setApiError("Invalid Username or Password!");
            }
        }   
    }

    return (
        <div className="App">
            <div className="outer">
                <div className="inner">
                    <form>
                        <h4>Covid_Persona - Log in</h4>
                        {apiError && <label className="error">{apiError}</label>}
                        <div className="form-group">
                            {usernameError ? 
                            <label className="error">{usernameError}</label> :
                            <label>Username</label>
                            }
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter username" 
                                onChange={handleUsername}
                            />
                        </div>
                        <div className="form-group">
                            {passwordError ? <label className="error">{passwordError}</label> :
                            <label>Password</label>
                            }
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Enter password" 
                                onChange={handlePassword}
                            />
                        </div>
                        <button 
                            type="button" 
                            className="btn btn-dark btn-lg btn-block" 
                            onClick={signIn}
                        >Sign in</button>
                        <p className="forgot-password text-right">
                            Not registered ?<a href="#">sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
  }

export default Login;