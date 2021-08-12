import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';

import { useAuth } from '../../context/authContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login, error, loading } = useAuth();

  const handleUsername = (e) => {
    setUsernameError('');
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPasswordError('');
    setPassword(e.target.value);
  };

  const signIn = async () => {
    if (!username) {
      setUsernameError('Username is required!');
    }
    if (!password) {
      setPasswordError('Password is required!');
    }
    if (!usernameError && !passwordError) {
      await login(username, password);
    }
  };

  return (
    <div class='login-body'>
      <div className='App'>
        <div className='outer'>
          <div className='inner'>
            <form>
              <h4>Covid_Persona - Log in</h4>
              {error && (
                <Alert variant='danger' className='py-2 my-3'>
                  {error}
                </Alert>
              )}
              {/* {apiError && <label className='error'>{apiError}</label>} */}
              <div className='form-group'>
                {usernameError ? (
                  <label className='error'>{usernameError}</label>
                ) : (
                  <label>Username</label>
                )}
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter username'
                  onChange={handleUsername}
                />
              </div>
              <div className='form-group'>
                {passwordError ? (
                  <label className='error'>{passwordError}</label>
                ) : (
                  <label>Password</label>
                )}
                <input
                  type='password'
                  className='form-control'
                  placeholder='Enter password'
                  onChange={handlePassword}
                />
              </div>
              <button
                type='button'
                className='btn btn-dark btn-lg btn-block'
                onClick={signIn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as='span'
                      animation='grow'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                    <span> Loading...</span>
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
              <p className='forgot-password text-right'>
                Not registered <Link to='/register'>sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
