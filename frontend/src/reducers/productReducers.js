import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  if (action.type === PRODUCT_LIST_REQUEST) {
    return { loading: true, products: [] };
  } else if (action.type === PRODUCT_LIST_SUCCESS) {
    return { loading: false, products: action.payload };
  } else if (action.type === PRODUCT_LIST_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  if (action.type === PRODUCT_DETAILS_REQUEST) {
    return { loading: true, ...state };
  } else if (action.type === PRODUCT_DETAILS_SUCCESS) {
    return { loading: false, product: action.payload };
  } else if (action.type === PRODUCT_DETAILS_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
