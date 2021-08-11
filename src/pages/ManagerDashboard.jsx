import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Toast } from 'react-bootstrap';

import { getDoctors } from '../services/doctorService';

const ManagerDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(getDoctors());
  }, []);

  const handleDelete = (doctor) => {
    setDoctors(doctors.filter((d) => d.id !== doctor.id));
  };

  return (
    <>
      <Link to='/doctors/new' className='text-decoration-none'>
        <div className='d-flex flex-row-reverse my-2'>
          <Button variant='primary'>Register Doctor</Button>
        </div>
      </Link>
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Contact No</th>
            <th>Specialization</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.contactNo}</td>
              <td>{doctor.specialization}</td>
              <td>
                <Link to={`/doctors/${doctor.id}`}>
                  <Button variant='warning'>Update</Button>
                </Link>
              </td>
              <td>
                <Button variant='danger' onClick={() => handleDelete(doctor)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ManagerDashboard;
