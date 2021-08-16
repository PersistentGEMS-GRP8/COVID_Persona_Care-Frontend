import React from 'react';
import { Container, Table } from 'react-bootstrap';

import { useAuth } from '../../context/authContext';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const hospitals = user.hospitals;
  return (
    <Container fluid>
      {/* <h1>Dashboard</h1> */}
      <h3 className='my-3'>My Hospitals</h3>
      {hospitals.length > 0 ? (
        <Table bordered hover className='mt-2'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.hId}>
                <td>{hospital.hName}</td>
                <td>{hospital.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No Data to show</p>
      )}
    </Container>
  );
};

export default DoctorDashboard;
