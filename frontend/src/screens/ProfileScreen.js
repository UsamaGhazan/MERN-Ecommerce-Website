import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../features/UserFeature/userDetailsSlice';
import { updateUserProfile } from '../features/UserFeature/updateProfileSlice';

const ProfileScreen = () => {
  //email aur passwor ki component level state is leye bana rahy hein kun k inka use sirf idr e hy
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  //For confirm password message
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  //agr pehly sy hi login hein to login screen pr na any k leye redirect use krein gay

  const userDetails = useSelector((store) => store.userDetails);
  const { loading, error, user } = userDetails;

  //Agr user login ho tab hi ye profile access honi chaiye
  const userLogin = useSelector((store) => store.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((store) => store.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    //Agr user logged nai hy to login page pr redirect kr rahy
    if (!userInfo) {
      navigate('/login');
    } else {
      //---------------------------------------------------------------------------------------
      if (!user.name) {
        //Bug Fix: Name update krny pr Navbar mein logout kr k login kry beghair ni hora tha (USER_UPDATE_PROFILE_RESET)
        // dispatch(USER_UPDATE_PROFILE_RESET);
        dispatch(getUserDetails('profile')); //-------------------------------
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, navigate, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Agr password match ni karty to...
    if (password !== confirmpassword) {
      setMessage('Password donot match');
    } else {
      //Dispatch update profile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {/* Agr password match ni hota to setMessage chaly ga useeffect mein aur message state mil jayegi */}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
