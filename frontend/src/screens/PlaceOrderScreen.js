import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

import {
  createOrder,
  ORDER_CREATE_RESET,
} from '../features/OrderFeature/orderCreateSlice';
import { USER_DETAILS_RESET } from '../features/UserFeature/userDetailsSlice';
const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  //Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  //Cart object ko modify karny k leye local copy bnai hy ...kun k kuch additional chezein add karni thien(prices)
  const cartObject = { ...cart };
  cartObject.itemsPrice = addDecimals(
    cartObject.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cartObject.shippingPrice = addDecimals(cartObject.itemsPrice < 100 ? 0 : 100);
  cartObject.taxPrice = addDecimals(
    Number((0.15 * cartObject.itemsPrice).toFixed(2))
  );
  cartObject.totalPrice = (
    Number(cartObject.itemsPrice) +
    Number(cartObject.shippingPrice) +
    Number(cartObject.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((store) => store.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    // agr sab kuch theek sy chal gya hy (orderSlice mein) aur data mil gya hy to...
    if (success) {
      // agr order data mila hy to usmein sy _id property nikalo
      navigate(`/order/${order._id}`);
      dispatch(ORDER_CREATE_RESET());
      dispatch(USER_DETAILS_RESET());
    }
    // To remove order._id dependency warning
    // eslint-disable-next-line
  }, [navigate, success]);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cartObject.itemsPrice, //taken from new object which was copy of cart object
        shippingPrice: cartObject.shippingPrice,
        taxPrice: cartObject.taxPrice,
        totalPrice: cartObject.totalPrice,
      })
    );
  };

  return (
    <>
      <Meta title='Place Order' />

      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                ,
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroupItem key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} x ${item.price}=${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cartObject.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cartObject.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cartObject.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cartObject.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroupItem>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroupItem>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
