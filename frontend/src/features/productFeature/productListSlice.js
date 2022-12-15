import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  products: [],
  error: '',
};

export const listProducts = createAsyncThunk(
  'getProductList',
  //keyword default '' is lye dea hy k agr HomeScreen sy keyword ni milta to bydefault empty string pass hojaye
  async (keyword = '') => {
    console.log(keyword);
    //har function k bananay pr 3 lifecycle items milaein gay(see in extra reducers)
    try {
      const resp = await axios(`/api/products?keyword=${keyword}`);
      return resp.data;
    } catch (error) {
      return error;
    }
  }
);

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [listProducts.pending]: (state) => {
      return {
        loading: true,
        products: [],
      };
    },

    [listProducts.fulfilled]: (state, action) => {
      return {
        loading: false,
        products: action.payload,
      };
    },

    [listProducts.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
// export const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } =
//   productListSlice.actions;
export default productListSlice.reducer;
