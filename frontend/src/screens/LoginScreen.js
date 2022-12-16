import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

import { login } from '../features/UserFeature/loginUserSlice';

const LoginScreen = () => {
  //email aur passwor ki component level state is leye bana rahy hein kun k inka use sirf idr e hy
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  //agr pehly sy hi login hein to login screen pr na any k leye redirect use krein gay
  const redirect = location.search ? location.search.split('=')[1] : '/';

  // console.log(redirect);
  const userLogin = useSelector((store) => store.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    //agr user khudsy login kr raha hy pehly to loggedin karny k bad home page pr lkr jao warna jo redirect mein value aye us page pr
    if (userInfo && redirect === '/') {
      navigate('/');
    } else if (userInfo && redirect) {
      navigate(`/${redirect}`);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <>
      <Meta title='Login' />
      <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlid='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlid='password'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
