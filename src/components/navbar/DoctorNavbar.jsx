import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useAuth } from '../../context/authContext';

const DoctorNavbar = () => {
  const { user, logout } = useAuth();
  return (
    <Navbar expand='lg' className='navbar-primary'>
      <Container fluid>
        <LinkContainer className='text-decoration-none' to='/doctor/dashboard'>
          <Navbar.Brand>Doctor Dashboard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='me-auto' activeKey={window.location.pathname}>
            <LinkContainer
              className='text-decoration-none'
              to='/doctor/appointment'
            >
              <Nav.Link>Appointments</Nav.Link>
            </LinkContainer>

            <NavDropdown title={user.name} className='justify-content-end'>
              <LinkContainer
                className='text-decoration-none'
                to='/doctor/update'
              >
                <NavDropdown.Item>Update Credentials</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default DoctorNavbar;
