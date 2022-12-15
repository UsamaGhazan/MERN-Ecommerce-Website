import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../features/productFeature/productListSlice';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((store) => store.productList);
  const { loading, error, products } = productList;
  const { keyword } = useParams();
  console.log(keyword);
  useEffect(() => {
    //keyword agr ni hoga to sab products mil jaien gi
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]); //adding dispatch to dependency to avoid warning

  return (
    <>
      <h1> Latest Products </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
