import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  product: [],
  error: '',
};

export const listProductDetails = createAsyncThunk(
  'getProductDetail',
  async (name) => {
    console.log(name);
    try {
      const resp = await axios(`/api/products/${name}`);
      return resp.data;
    } catch (error) {}
  }
);

const productDetailSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [listProductDetails.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [listProductDetails.fulfilled]: (state, action) => {
      return {
        loading: false,
        product: action.payload,
      };
    },

    [listProductDetails.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
// export const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } =
//   productListSlice.actions;
export default productDetailSlice.reducer;
