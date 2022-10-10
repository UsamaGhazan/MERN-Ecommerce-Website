import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../features/addToCart/cartSlice';
const ShippingScreen = () => {
  const { shippingAddress } = useSelector((store) => store.cart);
  console.log(shippingAddress);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //agr localStorage mein ye hein to initial state set hojayegi
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.country);
  const [country, setCountry] = useState(shippingAddress.country);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };
  return (
    <FormContainer>
      {/*step1 aur step2 pass kea hy ,,, koi value ni hy,, just isi sy pta chal jayegi checkout componet mein k 2 steps dalny hein */}
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter Address'
            //uncontrolled to controlled mein change honay wala error khatam karny k leye ye kea
            value={address ? address : ''}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='city'
            placeholder='Enter City'
            value={city ? city : ''}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>postalcode</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postalcode'
            value={postalCode ? postalCode : ''}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country name'
            value={country ? country : ''}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
export default ShippingScreen;
