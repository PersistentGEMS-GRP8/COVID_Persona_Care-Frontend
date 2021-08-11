import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const TextInput = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className='mb-3' controlId={props.name}>
        <Form.Label className={required ? 'control-label' : ''}>
          {label}
        </Form.Label>
        <Form.Control {...field} {...props} />
        {meta.touched && meta.error && (
          <p className='text-danger'>{meta.error}</p>
        )}
      </Form.Group>
    </>
  );
};

TextInput.defaultProps = {
  required: false,
};

export default TextInput;
