import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Form } from 'react-bootstrap';

import {
  getDoctors,
  getDoctorsByHospitalAndName,
  deleteDoctorInHospital,
} from '../services/doctorService';
import { useAuth } from '../context/authContext';

const ManagerDashboard = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const hospitalId = user.hId;

  useEffect(() => {
    const getDoc = async () => {
      if (search) {
        const { data } = await getDoctorsByHospitalAndName(hospitalId, search);
        setDoctors(data);
      } else {
        const { data } = await getDoctors(hospitalId);
        setDoctors(data);
      }
    };

    getDoc();
  }, [search]);

  const handleDelete = async (doctor) => {
    try {
      setDoctors(doctors.filter((d) => d.id !== doctor.id));
      await deleteDoctorInHospital(hospitalId, doctor.id);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        alert('Please login to continue');
        props.history.push('/login');
      }
      alert('Something went wrong');
    }
  };

  return (
    <Container fluid>
      <div className='d-flex flex-row-reverse my-2'>
        <Link to='/manager/doctors/new' className='text-decoration-none p-2'>
          <Button variant='primary'>Register Doctor</Button>
        </Link>
        <Link to='/manageBeds' className='text-decoration-none p-2'>
          <Button variant='primary'>Manage Beds</Button>
        </Link>
      </div>

      <Form>
        <Form.Group className='mb-3' controlId='doctor'>
          <Form.Label>Search Doctor</Form.Label>
          <Form.Control
            type='text'
            placeholder='Search doctor'
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Contact No</th>
            <th>Specialization</th>
            <th />
            {/* <th /> */}
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
              {/* <td>
                <Link to={`/doctors/${doctor.id}`}>
                  <Button variant='warning'>Update</Button>
                </Link>
              </td> */}
              <td>
                <Button variant='danger' onClick={() => handleDelete(doctor)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManagerDashboard;
