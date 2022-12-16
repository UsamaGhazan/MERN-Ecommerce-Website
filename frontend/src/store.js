import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './features/productFeature/productListSlice';
import productDetailsReducer from './features/productFeature/productDetailSlice';
import CartReducer from './features/addToCart/cartSlice';
import userLoginReducer from './features/UserFeature/loginUserSlice';
import userRegisterReducer from './features/UserFeature/registerUserSlice';
import userDetailsReducer from './features/UserFeature/userDetailsSlice';
import userUpdateProfileReducer from './features/UserFeature/updateProfileSlice';
import orderCreateReducer from './features/OrderFeature/orderCreateSlice';
import orderDetailsReducer from './features/OrderFeature/orderDetailsSlice';
import orderPayReducer from './features/OrderFeature/orderPaySlice';
import myOrderListReducer from './features/OrderFeature/myOrderListSlice';
import userListReducer from './features/UserFeature/userListSlice';
import userDeleteReducer from './features/UserFeature/userDeleteSlice';
import updateUserReducer from './features/UserFeature/updateUserSlice';
import productDeleteReducer from './features/productFeature/productDeleteSlice';
import productCreateReducer from './features/productFeature/productCreateSlice';
import productUpdateReducer from './features/productFeature/productUpdateSlice';
import allOrdersListReducer from './features/OrderFeature/allOrdersListSlice';
import orderDeliveredReducer from './features/OrderFeature/orderDeliveredSlice';
import productReviewReducer from './features/productFeature/productReviewSlice';
import productTopRatedReducer from './features/productFeature/productTopRatedSlice';
// yahan hum local storage sy data ly rahy hein jo cartSlice mein store kea tha ... JSON.parse is leye run kea hy kun k stringify kea tha data cartSlice mein
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null; //agr user info ni available to null return kar do
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: productReviewReducer,
    productTopRated: productTopRatedReducer,
    cart: CartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: updateUserReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliveredReducer,
    myOrderList: myOrderListReducer,
    orderList: allOrdersListReducer,
  },
  preloadedState: initialState, //for local storage
});
export default store;
