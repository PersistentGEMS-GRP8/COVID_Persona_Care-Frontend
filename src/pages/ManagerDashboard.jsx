import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import ManagerNavbar from '../components/Manager/ManagerNavbar'
import { getDoctors, deleteDoctorInHospital } from '../services/doctorService';

const ManagerDashboard = (props) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoc = async () => {
      const { data } = await getDoctors();
      console.log(data);
      setDoctors(data);
    };

    getDoc();
  }, []);

  const handleDelete = async (doctor) => {
    try {
      setDoctors(doctors.filter((d) => d.id !== doctor.id));
      await deleteDoctorInHospital(doctor.id);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        alert('Please login to continue');
        props.history.push('/login');
      }
      alert('Something went wrong');
    }
  };

  return (
    <>
    {/* <div className='d-flex flex-row-reverse my-2'>
      <Link to='/doctors/new' className='text-decoration-none p-2'>       
          <Button variant='primary'>Register Doctor</Button>
      </Link>
      <Link to='/manageBeds' className='text-decoration-none p-2'>
          <Button variant='primary'>Manage Beds</Button>
      </Link>
      </div> */}
      <ManagerNavbar/>
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
    </>
  );
};

export default ManagerDashboard;
