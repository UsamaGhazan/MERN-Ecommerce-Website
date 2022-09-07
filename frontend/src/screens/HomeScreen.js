import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  //Getting data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products'); //set a proxy to send request to backend
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1> Latest Products </h1>

      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
