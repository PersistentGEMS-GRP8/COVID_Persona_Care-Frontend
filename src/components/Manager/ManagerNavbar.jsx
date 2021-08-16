import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/admin.css';
import { AuthContext } from '../../context/authContext';

class ManagerNavbar extends Component {
  static contextType = AuthContext;
  render() {
    const { logout } = this.context;
    return (
      <div className='navbar navbar-fixed'>
        <nav className='navbar container '>
          <div className='btn-group' style={{ float: 'left' }}>
            <LinkContainer to='/manager/dashboard'>
              <a className='navbar-brand '>Dashboard</a>
            </LinkContainer>
            <LinkContainer to='/manager/doctors/new'>
              <a className='navbar-brand '>Register Doctor</a>
            </LinkContainer>
            <LinkContainer to='/manageBeds'>
              <a className='navbar-brand '>Manage Beds</a>
            </LinkContainer>
            <LinkContainer to='/manageVaccines'>
              <a className='navbar-brand '>Manage Vaccines</a>
            </LinkContainer>
          </div>

          <ul className='nav'>
            <li className='nav-item dropdown dropdown-menu-left'>
              <a
                className='nav-link dropdown-toggle btn-md'
                href='#'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                style={{ color: 'white' }}
              >
                MANAGER
              </a>
              <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <div className='dropdown-divider'></div>
                <a className='dropdown-item' onClick={logout}>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default ManagerNavbar;
