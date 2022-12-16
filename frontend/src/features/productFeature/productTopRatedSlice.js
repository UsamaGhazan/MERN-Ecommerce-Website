import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
};

export const getTopProducts = createAsyncThunk(
  'topRatedProduct',
  //keyword default '' is lye dea hy k agr HomeScreen sy keyword ni milta to bydefault empty string pass hojaye
  async () => {
    //keyword agr milay ga HomeScreen sy to theek hy warna '' pass hojaye ga and same for pageNumber
    // 2 queries pass karny k leye & use karty
    try {
      const { data } = await axios(`/api/products/top`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const productTopRatedSlice = createSlice({
  name: 'topRatedProduct',
  initialState,

  extraReducers: {
    [getTopProducts.pending]: (state) => {
      return {
        loading: true,
        products: [],
      };
    },

    [getTopProducts.fulfilled]: (state, action) => {
      return {
        loading: false,
        products: action.payload,
      };
    },

    [getTopProducts.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default productTopRatedSlice.reducer;
