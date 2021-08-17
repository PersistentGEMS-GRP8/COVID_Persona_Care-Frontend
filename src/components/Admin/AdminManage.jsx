import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Alert, Button, Table } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import TextInput from '../TextInput';
import { useAuth } from '../../context/authContext';
import {
  updateAdmin,
  getAllAdmin,
  deleteAdmin,
} from '../../services/adminService';
import AdminNavbar from './AdminNavbar';

const AdminManage = (props) => {
  const { user } = useAuth();
  const initialValues = {
    name: user.name,
    email: user.email,
    contactNo: user.contactNo,
  };

  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('Required'),
    email: Yup.string().email('Invalid Email Address').required('Required'),
    contactNo: Yup.string()
      .min(10, 'Must be atleast 10 character')
      .max(12, 'Must be less than 12 characters')
      .required('Required'),
  });

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await getAllAdmin();
        setAdmins(data);
      } catch (e) {
        if (e.response && e.response.status === 401) {
          alert('Please login to continue');
          props.history.push('/login');
        }
      }
    };

    getAll();
  }, []);

  const submitHandler = async (values) => {
    try {
      await updateAdmin(user.id, values.name, values.email, values.contactNo);
      window.location = '/adminDashboard';
    } catch (e) {
      if (e.response && e.response.status === 400) {
        setError(e.response.data.message);
      }

      if (e.response && e.response.status === 401) {
        alert('Please login to continue');
        props.history.push('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setAdmins(admins.filter((a) => a.id !== id));
      await deleteAdmin(id);
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
      <AdminNavbar />
      <Container className='my-4'>
        <Link to='/admin/new'>
          <Button className='mr-2'>Add New Admin</Button>
        </Link>
        <Button onClick={() => setIsUpdate(true)}>Update Me</Button>
        {isUpdate && (
          <Row>
            <Col lg={7}>
              <h1 className='my-3'>Update Form</h1>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <TextInput
                      label='Name'
                      type='text'
                      placeholder='Name'
                      name='name'
                      required
                    />

                    <TextInput
                      label='Email Address'
                      type='email'
                      placeholder='Email Address'
                      name='email'
                      required
                    />

                    <TextInput
                      label='Contact No'
                      type='text'
                      placeholder='Contact No'
                      name='contactNo'
                      required
                    />

                    <div>
                      <Button
                        variant='danger'
                        type='reset'
                        disabled={isSubmitting}
                        onClick={() => setIsUpdate(false)}
                        className='mr-3'
                      >
                        Close
                      </Button>
                      <Button type='submit' disabled={isSubmitting}>
                        Update
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        )}

        <Table bordered hover className='my-4'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.contactNo}</td>
                <td>
                  <Button
                    variant='danger'
                    disabled={admin.id === user.id}
                    onClick={() => handleDelete(admin.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AdminManage;
