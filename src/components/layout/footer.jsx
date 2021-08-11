import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
      <footer className='fixed-bottom'>
        <Container fluid>
          <Row>
            <Col className='text-center py-2 footer'>
              COVID-19 Persona Care System &copy; 2021
            </Col>
            {/* <span className='text-muted'>©2021</span> */}
          </Row>
        </Container>
      </footer>
    );
  }
}
export default Footer;
