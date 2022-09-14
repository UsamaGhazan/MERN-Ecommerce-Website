// import {
//   legacy_createStore as createStore,
//   combineReducers,
//   applyMiddleware,
// } from 'redux';
// import {
//   productListReducer,
//   productDetailsReducer,
// } from './reducers/productReducers';

// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const reducer = combineReducers({
//   productList: productListReducer,
//   productDetails: productDetailsReducer,
// });
// const initialState = {};
// const middleware = [thunk];
// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
//------------------------------------------------------------------------------------------------------------
import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './features/productListFeature/productListSlice';
import productDetailsReducer from './features/productListFeature/productDetailSlice';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
