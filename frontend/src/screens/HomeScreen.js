import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  //Getting data from backend... we will do it using Redux
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products'); //set a proxy to send request to backend
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  // console.log(productList);
  const { loading, error, products } = productList; //
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]); //adding dispatch to dependency to avoid warning

  return (
    <>
      <h1> Latest Products </h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
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
