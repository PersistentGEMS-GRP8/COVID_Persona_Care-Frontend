import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/admin.css';
import authService from "../../services/auth-service";

class AdminNavbar extends Component {
  render() {
    return (
      <div className="navbar navbar-fixed">
        <nav className="navbar container ">
          <div className="btn-group" style={{float:'left'}}>
            <a className="navbar-brand " href="/manageHospitals" >Manage Hospital</a>
            <a className="navbar-brand " href="/manageHadmins" >Manage Hospital Admins</a>
          </div>
          <ul className="nav" >
            <li className="nav-item dropdown dropdown-menu-left">
              <a className="nav-link dropdown-toggle btn-md" href="#" id="navbarDropdown" 
             role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
             style={{color: "white"}}>
            ADMIN
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {/* <a className="dropdown-item" href="#">Update Credentials</a> */}
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/" onClick={authService.logout}>Logout</a>
            </div>
            </li>
         </ul>
        </nav>
      </div>

    );
  }
}
export default AdminNavbar;