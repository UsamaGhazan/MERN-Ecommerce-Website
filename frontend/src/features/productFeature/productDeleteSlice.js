import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const deleteProduct = createAsyncThunk(
  'productDelete',
  async (id, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/products/${id}`, config);
    } catch (error) {
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      //This will end up in rejected section as payload... just error return karny sy fulfilled action run hora tha
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState,
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [deleteProduct.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [deleteProduct.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [deleteProduct.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default productDeleteSlice.reducer;
