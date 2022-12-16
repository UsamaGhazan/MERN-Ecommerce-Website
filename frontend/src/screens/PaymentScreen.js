import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

import { savePaymentMethod } from '../features/addToCart/cartSlice';
const PaymentScreen = () => {
  //Shippiing address ki zaroorat idr is leye hy kun k agr shipping address nai dea to redirect kr sakein user ko
  const navigate = useNavigate();
  //agr shipping address ni hy to shipping screen pr chly jao
  const { shippingAddress } = useSelector((store) => store.cart);
  if (!shippingAddress) {
    navigate('/shipping');
  }

  const dispatch = useDispatch();
  //agr localStorage mein ye hein to initial state set hojayegi
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  return (
    <>
      <Meta title='Payment' />

      <FormContainer>
        {/*step1 step2 step3 pass kea hy ,,, koi value ni hy,, just isi sy pta chal jayega checkout componet mein k 3 steps dalny hein */}
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              ></Form.Check>
              {/* Agr koi aur payment method dalna chahty hein... */}
              {/* <Form.Check
            type='radio'
            label='Stripe'
            id='Strpe'
            name='paymentMethod'
            value='Stripe'
            checked
            onClick={(e) => {
              setPaymentMethod(e.target.value);
            }}
          ></Form.Check> */}
            </Col>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
export default PaymentScreen;
