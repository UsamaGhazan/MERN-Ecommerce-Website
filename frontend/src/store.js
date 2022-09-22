import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './features/productListFeature/productListSlice';
import productDetailsReducer from './features/productListFeature/productDetailSlice';
import CartReducer from './features/addToCart/cartSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
// yahan hum local storage sy data ly rahy hein jo cartSlice mein store kea tha ... JSON.parse is leye run kea hy kun k stringify kea tha data cartSlice mein

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: CartReducer,
  },
  preloadedState: initialState, //for local storage
});
export default store;
