import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  orders: [],
};
//paymentResult will come from Paypal
export const getAllOrdersList = createAsyncThunk(
  'allOrdersList',
  async (NULL, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders`, config);
      return data;
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

const allOrdersListSlice = createSlice({
  name: 'allOrdersList',
  initialState,
  extraReducers: {
    [getAllOrdersList.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [getAllOrdersList.fulfilled]: (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    },

    [getAllOrdersList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default allOrdersListSlice.reducer;
