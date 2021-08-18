import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';
import { addVaccineData } from '../../services/patientSelfService';
import { useAuth } from '../../context/authContext';

const VaccineCard = ({ data }) => {
  return (
    <Card className='my-2'>
      <Card.Body>
        <Card.Title>Vaccine Dose {data.numberOfVaccine}</Card.Title>
        <Card.Text>
          Vaccine Name: {data.vaccineName} <br />
          Cerificate No: {data.certificateNo} <br />
          Date: {data.date} <br />
          Hospital: {data.hospitalName}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const vaccineData = [
  {
    certificateNo: '2542',
    vaccineName: 'Aztra',
    date: '08-08-2021',
    numberOfVaccine: '1',
    hospitalName: 'ABC Hospital',
  },
  {
    certificateNo: '2542',
    vaccineName: 'Aztra',
    date: '08-08-2021',
    numberOfVaccine: '2',
    hospitalName: 'ABC Hospital',
  },
];

const PatientVaccineStatus = () => {
  const [doseNumber, setDoseNumber] = useState(0);
  const [update, setUpdate] = useState(false);
  const [patientVaccine, setPatientVaccine] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    // patientService call get vaccine details
    setPatientVaccine(vaccineData);
    setDoseNumber(vaccineData.length + 1);
  }, []);

  const initialValues = {
    doseStatus: 'no',
    certificateNo: '',
    vaccineName: '',
    hospital: '',
    dateTaken: '',
  };

  const validationSchema = Yup.object({
    certificateNo: Yup.string().required('Required'),
    hospital: Yup.string().required('Required'),
    dateTaken: Yup.date().required('Required'),
  });

  const submitHandler = async (values) => {
    const data = {
      certificateNo: values.certificateNo,
      vaccineName: values.vaccineName,
      date: values.dateTaken,
      hospitalName: values.hospital,
      numberOfVaccine: doseNumber,
    };

    try {
      setPatientVaccine([...patientVaccine, data]);
      await addVaccineData(data);
      setDoseNumber(doseNumber + 1);
      setUpdate(false);
    } catch (e) {
      console.log(e.response);
    }

    console.log(data);
  };

  const onClickUpdateStatus = () => {
    if (doseNumber == 0) {
      setDoseNumber(1);
    }
    setUpdate(true);
  };

  return (
    <Container fluid>
      <h3 className='my-3'>Vaccine Status</h3>
      {patientVaccine.length === 0 && (
        <p>Either you have not taken vaccination or not updated</p>
      )}

      {patientVaccine.length === 2 && (
        <p>You have completed your vaccination</p>
      )}

      <Row>
        {patientVaccine.length > 0 &&
          patientVaccine.map((vaccineData) => (
            <Col md='5' lg='4'>
              <VaccineCard data={vaccineData} />
            </Col>
          ))}
      </Row>

      {patientVaccine.length < 2 && (
        <Button className='my-3' onClick={onClickUpdateStatus}>
          Update my vaccine status
        </Button>
      )}

      {update && (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Row>
                <Col lg='6'>
                  <SelectInput
                    label={`Have you taken ${
                      doseNumber === 1 ? '1st' : '2nd'
                    } Dose`}
                    type='select'
                    name='doseStatus'
                  >
                    <option value='no'>No</option>
                    <option value='yes'>Yes</option>
                  </SelectInput>

                  <TextInput
                    label='Cetificate No'
                    type='text'
                    placeholder='Cetificate No'
                    name='certificateNo'
                    disabled={values.doseStatus === 'no'}
                  />

                  <SelectInput
                    label='Vaccine Name'
                    type='select'
                    name='vaccineName'
                    disabled={values.doseStatus === 'no'}
                    value={values.doseStatus === 'no' ? '' : values.vaccineName}
                  >
                    <option value='Sinopharm'>Sinopharm</option>
                    <option value='Aztra'>Aztra</option>
                  </SelectInput>

                  <TextInput
                    label='Hospital'
                    type='text'
                    name='hospital'
                    placeholder='Hospital name'
                    disabled={values.doseStatus === 'no'}
                  />

                  <TextInput
                    label='Date'
                    type='date'
                    name='dateTaken'
                    disabled={values.doseStatus === 'no'}
                  />

                  <Button
                    variant='danger'
                    className='mr-3'
                    onClick={() => setUpdate(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={values.doseStatus === 'no'} type='submit'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default PatientVaccineStatus;
