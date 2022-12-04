import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../features/UserFeature/userDetailsSlice';
import { updateUser } from '../features/UserFeature/updateUserSlice';
import { USER_UPDATE_RESET } from '../features/UserFeature/updateUserSlice';
const UserEditScreen = () => {
  const params = useParams();
  const userId = params.id;

  //email aur password ki component level state is leye bana rahy hein kun k inka use sirf idr e hy
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  //agr pehly sy hi login hein to login screen pr na any k leye redirect use krein gay

  const userDetails = useSelector((store) => store.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((store) => store.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    //agr user update hogya hy
    if (successUpdate) {
      dispatch(USER_UPDATE_RESET());
      navigate('/admin/userList');
    } else {
      //agr user ni exist karta ya jo url mein id hy wo store mein jo user hy uski id sy match ni karta to
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [
    userId,
    dispatch,
    user._id,
    user.email,
    user.name,
    user.isAdmin,
    navigate,
    successUpdate,
    user,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                // Agr admin hy to pehly sy hi checked kr do
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
