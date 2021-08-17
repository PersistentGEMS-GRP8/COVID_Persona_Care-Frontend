import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../components/TextInput';

import { addAdmin } from '../../services/adminService';
import AdminNavbar from './AdminNavbar';

const AddAdmin = (props) => {
  const initialValues = {
    name: '',
    email: '',
    contactNo: '',
    userName: '',
  };

  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('Required'),
    email: Yup.string().email('Invalid Email Address').required('Required'),
    contactNo: Yup.string()
      .min(10, 'Must be atleast 10 character')
      .max(12, 'Must be less than 12 characters')
      .required('Required'),
    userName: Yup.string().min(3).required('Required'),
  });

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      await addAdmin(
        values.name,
        values.email,
        values.contactNo,
        values.userName
      );
      props.history.push('/admin/manage');
    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log(e.response);
        setError(e.response.data.message);
      }
      if (e.response && e.response.status === 401) {
        alert('Please login to continue');
        props.history.push('/login');
      }

      console.log(e);
    }

    setSubmitting(false);
  };

  return (
    <>
      <AdminNavbar />
      <Container className='my-4'>
        <Row>
          <Col lg={7}>
            <h1 className='mb-3'>New Admin Form</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              {({ isSubmitting, errors, setFieldValue, values }) => (
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
                    label='User name'
                    type='text'
                    placeholder='User name'
                    name='userName'
                    required
                  />

                  <TextInput
                    label='Contact No'
                    type='text'
                    placeholder='Contact No'
                    name='contactNo'
                    required
                  />

                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-100 m-2'
                  >
                    Add
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddAdmin;
