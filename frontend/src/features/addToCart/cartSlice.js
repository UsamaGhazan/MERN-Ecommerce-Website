import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const addToCart = createAsyncThunk(
  'addToCart',
  async ({ id, qty }, thunkAPI) => {
    //getting id and qty from cartScreen
    try {
      const { data } = await axios(`/api/products/${id}`);
      // localStorage.setItem(// change the location of storage where you can access all the cart items
      //   'cartItems',
      //   JSON.stringify(thunkAPI.getState().cart.cartItems)
      // ); //data ko local storage save rakhny k lye... isko humny json.stringify kea hy kun k local storage mein sirf string store kr sakty... yahan hum ny local storage mein store kea hy lekin isko fetch store mein jakar krein gay
      const productData = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      };
      return productData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    CART_REMOVE_ITEM: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));// local storage issue... (here redux syntax used... change accordingly)
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.cartItems = [];
    },
    [addToCart.fulfilled]: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            return cartItem.product === existItem.product ? item : cartItem;
          }),
        };
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    [addToCart.rejected]: (state) => {
      state.cartItems = 'Some error has occured';
    },
  },
});
export const { CART_REMOVE_ITEM } = cartSlice.actions;
export default cartSlice.reducer;
