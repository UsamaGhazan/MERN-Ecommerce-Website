import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, CART_REMOVE_ITEM } from '../features/addToCart/cartSlice';

const CartScreen = () => {
  const { id } = useParams(); //har dafa id ni milay gi ... kun k agr hum simply cart page pr jaein to id ni hogi
  const location = useLocation(); //After ?.... here ?qty=(somenumber)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1; //kea qty hy?(?qty=1) agr hy to usy = sign sy split karo aur 1st index element rakh do jo k 1 hy warna just 1 rakh do

  const cart = useSelector((store) => store.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (id) {
      //agr id hy to ye kam karo...
      dispatch(addToCart({ id, qty })); // same as passing {id:id, qty:qty}
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(CART_REMOVE_ITEM(id));
  };
  const checkOutHandler = () => {
    navigate('/login?redirect=shipping'); //agr user login hy to shipping pr ly jao warna login pr ly jao
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to='/'>Go Back</Link>{' '}
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name} </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart({
                              id: item.product,
                              qty: Number(e.target.value), //agr qty change hogi to addToCart dispatch hojaye ga kun k value mein {item.qty} hy
                            })
                          )
                        }
                      >
                        {
                          //The Array() constructor is used to create Array objects.
                          // agr single number hoga Array() k andr to wo uski length consider hoga
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }
                        console.log(...Array(product.countInStock).keys())
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {/* Showing total items  */}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                item
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
