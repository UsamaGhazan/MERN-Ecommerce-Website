import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../features/UserFeature/registerUserSlice';

const RegisterScreen = () => {
  //email aur passwor ki component level state is leye bana rahy hein kun k inka use sirf idr e hy
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  //For confirm password message
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  //agr pehly sy hi login hein to login screen pr na any k leye redirect use krein gay
  const redirect = location.search ? location.search.split('=')[1] : '/';
  // console.log(redirect);
  const userRegister = useSelector((store) => store.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    //Agr user logged nai hy to userInfo hogi... yahan check kr rahy k kea user login hy
    if (userInfo) {
      //agr user pehly sy logged in hy
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Agr password match ni karty to...
    if (password !== confirmpassword) {
      setMessage('Password donot match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {/* Agr password match ni hota to setMessage chaly ga useeffect mein aur message state mil jayegi */}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already Signed Up?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
