import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  orders: [],
};
//paymentResult will come from Paypal
export const getOrdersList = createAsyncThunk(
  'myOrderList',
  async (NULL, thunkAPI) => {
    console.log(thunkAPI);
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/myorders`, config);
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

const myOrderListSlice = createSlice({
  name: 'myOrderList',
  initialState,
  extraReducers: {
    [getOrdersList.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [getOrdersList.fulfilled]: (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    },

    [getOrdersList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default myOrderListSlice.reducer;
