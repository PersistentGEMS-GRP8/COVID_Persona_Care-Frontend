import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from '../components/TextInput';
import { getDoctorById, addDoctor } from '../services/doctorService';

const RegisterDoctor = (props) => {
  const initialFormValues = {
    name: '',
    email: '',
    contactNo: '',
    specialization: '',
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [initialValues, setInitialValues] = useState(initialFormValues);

  const doctorId = props.match.params.id;

  useEffect(() => {
    if (doctorId === 'new') return;
    const doctor = getDoctorById(doctorId);
    if (!doctor) props.history.replace('/not-found');
    setInitialValues({
      name: doctor.name,
      email: doctor.email,
      contactNo: doctor.contactNo,
      specialization: doctor.specialization,
    });
    setIsUpdate(true);
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('Required'),
    email: Yup.string().email('Invalid Email Address').required('Required'),
    contactNo: Yup.string()
      .min(10, 'Must be atleast 10 character')
      .max(12, 'Must be less than 12 characters')
      .required('Required'),
    specialization: Yup.string().required('Required'),
  });

  const submitHandler = (values) => {
    if (isUpdate) {
      // Call update api call
    } else {
      // Call Register api call
      addDoctor({ id: Date.now().toString(), ...values });
    }
    props.history.push('/manager/dashboard');
  };

  return (
    <Container className='my-4'>
      <Row className='d-flex justify-content-center'>
        <Col lg={7}>
          <h1 className='mb-3'>Doctor Form</h1>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            {({ isSubmitting, errors }) => (
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
                  required
                />

                <div className='d-grid gap-2 my-4'>
                  <Button type='submit' disabled={isSubmitting}>
                    {isUpdate ? 'Update' : 'Register'}
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

export default RegisterDoctor;
