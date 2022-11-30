import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {};
//paymentResult will come from Paypal
export const payOrder = createAsyncThunk(
  'orderPay',
  async ({ orderId, paymentResult }, thunkAPI) => {
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
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
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

const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState,
  reducers: {
    ORDERS_PAY_RESET: () => {
      console.log('Order pay reset is working');
      return {};
    },
  },
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay

    [payOrder.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [payOrder.fulfilled]: (state, action) => {
      return {
        loading: false,
        //ab yahan pr humy koi data nai bhejna balky just paid success ka btana hy
        success: true,
      };
    },

    [payOrder.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { ORDERS_PAY_RESET } = orderPaySlice.actions;
export default orderPaySlice.reducer;
