import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  product: { reviews: [] },
};

export const listProductDetails = createAsyncThunk(
  'getProductDetail',
  async (id) => {
    //id is comming from ProductScreen
    try {
      const { data } = await axios(`/api/products/${id}`); //ye sara data nikal kar action.payload mein dal deta hy
      return data;
    } catch (error) {
      return error;
    }
  }
);

const productDetailSlice = createSlice({
  name: 'productList',
  initialState,
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
        loading: true,
        error: action.payload,
      };
    },
  },
});

export default productDetailSlice.reducer;
