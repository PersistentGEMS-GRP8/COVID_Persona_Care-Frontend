import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Col, Container, Row, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';

import TextInput from '../../components/TextInput';
import { useAuth } from '../../context/authContext';
import { getDoctorById, updateDoctor } from '../../services/doctorService';

const DoctorUpdate = (props) => {
  const { user } = useAuth();
  const initialFormValues = {
    name: '',
    email: '',
    contactNo: '',
    specialization: '',
  };

  const [initialValues, setInitialValues] = useState(initialFormValues);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('Required'),
    email: Yup.string().email('Invalid Email Address').required('Required'),
    contactNo: Yup.string()
      .min(10, 'Must be atleast 10 character')
      .max(12, 'Must be less than 12 characters')
      .required('Required'),
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getDoctorById(user.id);
      setInitialValues({
        name: data.name,
        email: data.email,
        contactNo: data.contactNo,
        specialization: data.specialization,
      });
    };
    fetch();
  }, []);

  const submitHandler = async (values) => {
    try {
      await updateDoctor(user.id, values.name, values.email, values.contactNo);
      window.location = '/doctor/dashboard';
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

  return (
    <Container className='my-4'>
      <Row className='d-flex justify-content-center'>
        <Col lg={7}>
          <h1 className='mb-3'>Update Form</h1>
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

                <TextInput
                  label='Specialization'
                  type='text'
                  placeholder='Specialization'
                  name='specialization'
                  disabled={true}
                />

                <div className='d-grid gap-2 my-4'>
                  <Button type='submit' disabled={isSubmitting}>
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorUpdate;
