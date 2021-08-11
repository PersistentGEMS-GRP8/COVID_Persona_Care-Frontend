import React, { useState } from "react";
import authService from "../../services/auth-service";
import userService from "../../services/user.service";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsername (e) {
        setUsername(e.target.value);
    }   

    function handlePassword (e) {
        setPassword(e.target.value);
    }  

    function signIn(){
        authService.login(username,password)
    }

    function admin(){
        userService.getAdminBoard().then(response => {
    
            console.log(response.data)
          });;
    }

    return (
      <div className="Comment">
        <div className="form-group">

            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control"  placeholder="Enter username" onChange={handleUsername}/>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control"  placeholder="Password" onChange={handlePassword}/>
        </div>
        <button type="submit" class="btn btn-primary" onClick={signIn}>Submit</button>
        <button type="submit" class="btn btn-primary" onClick={admin}>Admin</button>
      </div>
    );
  }

export default Login;