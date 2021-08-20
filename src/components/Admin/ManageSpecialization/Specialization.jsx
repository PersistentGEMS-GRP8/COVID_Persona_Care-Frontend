import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';

import {
  addSpecialization,
  getAllSpecializationWithDocCount,
  deleteSpecialization,
  updateSpecialization,
} from '../../../services/specializationService';
import AdminNavbar from '../AdminNavbar';

const Specialization = (props) => {
  const [specializations, setSpecializations] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState({
    id: '',
    name: '',
  });

  useEffect(() => {
    setError(null);
    setSuccess(false);
    const fetchSpecializations = async () => {
      if (name) {
        const { data } = await getAllSpecializationWithDocCount(name);
        setSpecializations(data);
      } else {
        const { data } = await getAllSpecializationWithDocCount();
        setSpecializations(data);
      }
    };

    if (!show) fetchSpecializations();
  }, [name, show]);

  const submitHandler = async (e) => {
    setError(null);
    setSuccess(false);
    e.preventDefault();
    try {
      const { data } = await addSpecialization(name);
      setSpecializations([...specializations, data]);
      setSuccess(true);
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

  const onChangeHandler = (e) => {
    setName(e.target.value);
  };

  const deleteHandler = async (spec) => {
    // const updatedSpecializations =
    const specializationsBefore = specializations;
    setSpecializations(specializations.filter((s) => s.id !== spec.id));
    try {
      await deleteSpecialization(spec.id);
    } catch (e) {
      setSpecializations(specializationsBefore);
      if (e.response && e.response.status === 400) {
        setError(e.response.data.message);
      }
      if (e.response && e.response.status === 401) {
        alert('Please login to continue');
        props.history.push('/login');
      }
    }
  };

  const showUpdateModal = (specialization) => {
    setUpdate(specialization);
    setShow(true);
  };

  const updateHandler = async () => {
    try {
      await updateSpecialization(update.id, update.name);
      setShow(false);
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
    <>
      <AdminNavbar />
      <Container>
        {error && (
          <Alert className='my-3' variant='danger'>
            {error}
          </Alert>
        )}
        {success && (
          <Alert className='my-3' variant='success'>
            Successfully added
          </Alert>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-3' controlId='specialization'>
            <Form.Label>Search / Add Specialization</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type='text'
                  placeholder='Specialization'
                  onChange={onChangeHandler}
                  value={name}
                />
              </Col>
              <Col>
                <Button type='submit' disabled={!name}>
                  Add
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>

        <Modal show={show} onHide={() => setShow(!show)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Specialization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='my-3' controlId='updatespecialization'>
              <Form.Control
                type='text'
                placeholder='Specialization'
                onChange={(e) => {
                  e.preventDefault();
                  setUpdate({
                    ...update,
                    name: e.target.value,
                  });
                }}
                value={update.name}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShow(!show)}>
              Close
            </Button>
            <Button variant='primary' onClick={updateHandler}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Doctor Count</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>
            {specializations.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.docCount}</td>
                <td>
                  <Button variant='warning' onClick={() => showUpdateModal(s)}>
                    Update
                  </Button>
                </td>
                <td>
                  <Button variant='danger' onClick={() => deleteHandler(s)}>
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

export default Specialization;
