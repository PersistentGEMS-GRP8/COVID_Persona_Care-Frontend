import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Row, Col, Alert, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import _ from 'lodash';

import TextInput from '../components/TextInput';
import { register } from '../services/userService';

const Register = () => {
  const [error, setError] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('Required'),
    email: Yup.string().email('Invalid Email Address').required('Required'),
    contactNo: Yup.string()
      .min(10, 'Must be atleast 10 character')
      .max(12, 'Must be less than 12 characters')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Must be atlease 6 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password does not match')
      .required('Required'),
  });

  const submitHandler = async (values, { setSubmitting }) => {
    setError(null);
    setSubmitting(true);
    try {
      await register(values);
      console.log(values);
    } catch (err) {
      if (err.response && err.response.status === 400)
        setError(err.response.data);
    }
    setSubmitting(false);
  };

  return (
    <Container className='p-2'>
      <h1 className='my-3'>Register</h1>
      {error && <Alert variant='danger'>{error}</Alert>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Row>
              <Col md={12} lg={4}>
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
                  label='Password'
                  type='password'
                  placeholder='Password'
                  name='password'
                  required
                />

                <TextInput
                  label='Confirm Password'
                  type='password'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  required
                />
                <div className='d-grid gap-2 my-4'>
                  <Button
                    type='submit'
                    disabled={isSubmitting || !_.isEmpty(errors)}
                  >
                    Register
                  </Button>
                </div>
                <div className='mb-5'>
                  Already have an Account?{' '}
                  <Link className='text-decoration-none' to='/'>
                    <span className='link-primary'>Login now</span>
                  </Link>
                </div>
              </Col>

              <Col lg={8}>
                <img
                  className='w-100 d-none d-lg-block '
                  src='hospital.jpg'
                  alt='hospital'
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
