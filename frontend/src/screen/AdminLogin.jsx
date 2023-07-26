import { useState } from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify'
import { useLoginAdminMutation } from '../slices/usersApiSlice';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginAdmin] = useLoginAdminMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin({email,password}).unwrap()
      dispatch(setAdminCredentials({...res}))
      setEmail('')
      setPassword('')
      navigate('/dashboard')
    } catch (err) {
      console.log(err);
      toast.error('invalid admin email or password')
    }

    
  };

  return (
    <FormContainer>
      <h1> Admin Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminLogin;