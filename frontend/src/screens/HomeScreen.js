import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts } from '../features/productFeature/productListSlice';
import { useParams } from 'react-router-dom';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((store) => store.productList);
  const { loading, error, products, page, pages } = productList;
  const { keyword } = useParams();
  const pageNumb = useParams();
  //agr pageNumber milay to wo kr do warna 1
  const pageNumber = pageNumb.pageNumber || 1;
  useEffect(() => {
    //keyword agr ni hoga to sab products mil jaien gi
    dispatch(listProducts({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]); //adding dispatch to dependency to avoid warning

  return (
    <>
      <Meta />
      {/* Agr keyword ni hy to mtlb k search ni kr raha user aur tab hum sirf carousel dikha rahy */}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          <Button
            variant='outline-dark'
            className='p-1'
            style={{ boxShadow: 'none' }}
          >
            Go Back
          </Button>
        </Link>
      )}
      <h1> Latest Products </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
