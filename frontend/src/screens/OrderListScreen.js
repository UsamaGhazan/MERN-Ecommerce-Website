import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

import { getAllOrdersList } from '../features/OrderFeature/allOrdersListSlice';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderList = useSelector((store) => store.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((store) => store.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    //Agr admin logged in hy tab hi users ki list lao warna login screen pr ly jao
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrdersList());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <Meta title='Orders List' />

      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                {/* agr order.user exist karta hy to order.user.name dikhao */}
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
