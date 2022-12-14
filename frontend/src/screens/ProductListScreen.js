import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { listProducts } from '../features/productFeature/productListSlice';
import { deleteProduct } from '../features/productFeature/productDeleteSlice';
import {
  createProduct,
  PRODUCT_CREATE_RESET,
} from '../features/productFeature/productCreateSlice';

const ProductListScreen = () => {
  const pageNumb = useParams();
  //agr pageNumber milay to wo kr do warna 1
  const pageNumber = pageNumb.pageNumber || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((store) => store.productList);
  const { loading, error, products, page, pages } = productList;
  const productDelete = useSelector((store) => store.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((store) => store.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((store) => store.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(PRODUCT_CREATE_RESET());
    //Agr admin logged in hy tab hi users ki list lao warna login screen pr ly jao
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Meta title='Products List' />

      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Price</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
