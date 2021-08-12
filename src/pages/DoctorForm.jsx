import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from '../components/TextInput';
import * as doctorService from '../services/doctorService';
import { getAllSpecialization } from '../services/specializationService';
import SelectInput from '../components/SelectInput';

const DoctorForm = (props) => {
  const initialFormValues = {
    name: '',
    email: '',
    contactNo: '',
    specialization: '1',
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [isExitingDoctor, setIsExistingDoctor] = useState(false);
  const [exitingDoctorId, setExistingDoctorId] = useState(-1);
  const [initialValues, setInitialValues] = useState(initialFormValues);
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const fetchDoctorsByName = async (name) => {
    const { data } = await doctorService.getDoctorsByName(name);
    setDoctors(data);
    console.log(data);
  };

  const doctorId = props.match.params.id;

  useEffect(() => {
    const fetchSpecializations = async () => {
      const { data } = await getAllSpecialization();
      setSpecializations(data);
    };

    fetchSpecializations();
  }, []);

  useEffect(() => {
    if (doctorId === 'new') return;
    const fetch = async () => {
      try {
        const { data } = await doctorService.getDoctorById(doctorId);
        setInitialValues({
          name: data.name,
          email: data.email,
          contactNo: data.contactNo,
          specialization: '',
        });
        setIsUpdate(true);
      } catch (e) {
        console.log(e);
        props.history.replace('/not-found');
      }
    };
    fetch();
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

  const addNewDoctor = async (values) => {
    try {
      const { data } = await doctorService.addDoctor(
        values.name,
        values.email,
        values.contactNo,
        values.specialization
      );
      await doctorService.addDoctorToHospital(data.id);
      props.history.push('/manager/dashboard');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        alert('Please login to continue');
        props.history.push('/login');
      }
      console.log(e);
    }
  };

  const addExistingDoctor = async () => {
    try {
      await doctorService.addDoctorToHospital(exitingDoctorId);
      props.history.push('/manager/dashboard');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        alert('Please login to continue');
        props.history.push('/login');
      }
      console.log(e);
    }
  };

  const submitHandler = (values) => {
    if (isExitingDoctor) {
      addExistingDoctor();
    } else {
      addNewDoctor(values);
    }
  };

  const onClickExistingDoctor = (doctor) => {
    setInitialValues({
      name: doctor.name,
      email: doctor.email,
      contactNo: doctor.contactNo,
      specialization: doctor.specializationId,
    });
    setDoctors([]);
    setIsExistingDoctor(true);
    setExistingDoctorId(doctor.id);
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
            {({ isSubmitting, errors, setFieldValue, values }) => (
              <Form>
                <TextInput
                  label='Name'
                  type='text'
                  placeholder='Name'
                  name='name'
                  disabled={isExitingDoctor && true}
                  onChange={(e) => {
                    setFieldValue('name', e.target.value);
                    fetchDoctorsByName(e.target.value);
                  }}
                  required
                />

                {doctors && doctors.length > 0 && (
                  <ListGroup>
                    {doctors.map((doctor) => (
                      <ListGroup.Item
                        action
                        key={doctor.id}
                        onClick={() => {
                          onClickExistingDoctor(doctor);
                        }}
                      >
                        <div>
                          {doctor.name} &nbsp; || &nbsp;{doctor.specialization}{' '}
                        </div>
                      </ListGroup.Item>
                    ))}
                    <Button variant='info' onClick={() => setDoctors([])}>
                      Add New
                    </Button>
                  </ListGroup>
                )}

                <TextInput
                  label='Email Address'
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  disabled={isExitingDoctor && true}
                  required
                />
                <TextInput
                  label='Contact No'
                  type='text'
                  placeholder='Contact No'
                  name='contactNo'
                  disabled={isExitingDoctor && true}
                  required
                />

                <SelectInput
                  label='Specialization'
                  type='select'
                  name='specialization'
                  disabled={isExitingDoctor && true}
                >
                  {specializations.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {sp.name}
                    </option>
                  ))}
                </SelectInput>

                <div className='my-4 d-flex justify-content-center'>
                  {isExitingDoctor && (
                    <Button
                      variant='danger'
                      type='submit'
                      disabled={isSubmitting}
                      className='w-100 m-2'
                      onClick={() => {
                        setInitialValues(initialFormValues);
                        setIsExistingDoctor(false);
                        setExistingDoctorId(-1);
                      }}
                    >
                      Reset
                    </Button>
                  )}
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-100 m-2'
                  >
                    {isExitingDoctor
                      ? 'Add to Hospital'
                      : 'Create & Register to Hospital'}
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

export default DoctorForm;
