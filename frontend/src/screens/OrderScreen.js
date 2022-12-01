import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
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
import Loader from '../components/Loader';
import { getOrderDetails } from '../features/OrderFeature/orderDetailsSlice';
import {
  payOrder,
  ORDERS_PAY_RESET,
} from '../features/OrderFeature/orderPaySlice';

const OrderScreen = () => {
  const dispatch = useDispatch();
  //To get the id of order
  const params = useParams();
  const orderId = params.id;
  const [sdkReady, setSDKReady] = useState(false);
  const orderDetails = useSelector((store) => store.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((store) => store.orderPay);
  //Humary pas pehly hi aik loading hy is leye yahan loading ko rename kar k loadingPay kr dea same with success
  const { success: successPay, loading: loadingPay } = orderPay;

  //agr jo order state mein store hy uski id orderId(param.id) sy match ni hoti to orderId lo aur uski details lao
  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch]);
  useEffect(() => {
    const addPayPalScript = async () => {
      //backend sy clientId milay gi
      const { data: clientId } = await axios.get('/api/config/paypal');
      // console.log(clientId);
      //vanilla js
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        //This will tell us that script has been loaded
        setSDKReady(true);
      };
      document.body.appendChild(script);
    };
    //agr order ni hy tab b details show karo aur agr payment hogai hein tab b
    if (!order || successPay) {
      //agr reset nai karo gay to pay karny k bad refresh hota rahy ga (infinite loop)
      dispatch(ORDERS_PAY_RESET());
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSDKReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);
  //paymentResult is comming from paypal
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder({ orderId, paymentResult }));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country},
              </p>
              {order.isDelivered ? (
                <Message variant='flush'>
                  {' '}
                  Delivered at {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'> Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => {
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
