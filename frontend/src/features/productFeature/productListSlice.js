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
  async ({ keyword = '', pageNumber = '' }) => {
    console.log(keyword, pageNumber);
    //keyword agr milay ga HomeScreen sy to theek hy warna '' pass hojaye ga and same for pageNumber
    // 2 queries pass karny k leye & use karty
    try {
      const { data } = await axios(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      return data;
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
        //payload mein multiple chezein mil rahi hein object k through
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
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
