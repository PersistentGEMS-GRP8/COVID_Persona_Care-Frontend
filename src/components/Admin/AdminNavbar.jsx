import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/admin.css';

import {AuthContext} from '../../context/authContext'

class AdminNavbar extends Component {
  static contextType = AuthContext;   
  render() {
    const {logout} = this.context;
    return (
      <div className="navbar navbar-fixed">
        <nav className="navbar container ">
          <div className="btn-group" style={{float:'left'}}>
            <a className="navbar-brand " href="/manageHospitals" >Manage Hospital</a>
            <a className="navbar-brand " href="/manageHadmins" >Manage Hospital Admins</a>
            <a className="navbar-brand " href="/specialization" >Manage Doctor Specialization</a>
          </div>
          <ul className="nav" >
            <li className="nav-item dropdown dropdown-menu-left">
              <a className="nav-link dropdown-toggle btn-md" href="#" id="navbarDropdown" 
             role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
             style={{color: "white"}}>
            ADMIN
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/admin/manage">Manage</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={logout}>Logout</a>
            </div>
            </li>
         </ul>
        </nav>
      </div>

    );
  }
}
export default AdminNavbar;