import React from 'react';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className='my-1' htmlFor={props.id || props.name}>
        {label}
      </label>
      <Form.Select {...field} {...props}></Form.Select>
      {meta.touched && meta.error && (
        <p className='text-danger'>{meta.error}</p>
      )}
    </>
  );
};

export default SelectInput;
