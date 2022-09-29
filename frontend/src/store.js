import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './features/productListFeature/productListSlice';
import productDetailsReducer from './features/productListFeature/productDetailSlice';
import CartReducer from './features/addToCart/cartSlice';
import userLoginReducer from './features/UserFeature/loginUserSlice';
import userRegisterReducer from './features/UserFeature/registerUserSlice';

// yahan hum local storage sy data ly rahy hein jo cartSlice mein store kea tha ... JSON.parse is leye run kea hy kun k stringify kea tha data cartSlice mein
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null; //agr user info ni available to null return kar do

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: CartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
  },
  preloadedState: initialState, //for local storage
});
export default store;
