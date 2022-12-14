import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const createProductReview = createAsyncThunk(
  'reviewProduct',
  async ({ productId, review }, thunkAPI) => {
    console.log(productId, review);
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`/api/products/${productId}/reviews`, review, config);
    } catch (error) {
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const productReviewSlice = createSlice({
  name: 'reviewProduct',
  initialState,
  reducers: {
    PRODUCT_REVIEW_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    [createProductReview.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [createProductReview.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [createProductReview.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { PRODUCT_REVIEW_RESET } = productReviewSlice.actions;
export default productReviewSlice.reducer;
