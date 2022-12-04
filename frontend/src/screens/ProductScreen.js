import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../features/productListFeature/productDetailSlice';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  // const { id } = useParams(); //This id is string... convert to number
  // const product = products.find((product) => product._id === id);
  //Getting data from backend
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${id}`); //set a proxy to send request to backend
  //     setProduct(data);
  //   };
  //   fetchProduct();
  // }, []);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // console.log(product.name);
  const { id } = useParams(); //This id is comming from route...This id is string... convert to number...
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Use effect ran');
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = (e) => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        {' '}
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description:{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {
                            //The Array() constructor is used to create Array objects.
                            // agr single number hoga Array() k andr to wo uski length consider hoga
                            [...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))
                          }
                          console.log(...Array(product.countInStock).keys())
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
