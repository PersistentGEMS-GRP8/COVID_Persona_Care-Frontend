import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useAuth } from '../../context/authContext';

const ReceptionistNavbar = () => {
  const { user, logout } = useAuth();
  return (
    <Navbar expand='lg' className='navbar-primary'>
      <Container fluid>
        <LinkContainer className='text-decoration-none' to='/patients'>
          <Navbar.Brand>Receptionist Dashboard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='me-auto' activeKey={window.location.pathname}>
            <NavDropdown title={user.name} className='justify-content-end'>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default ReceptionistNavbar;
