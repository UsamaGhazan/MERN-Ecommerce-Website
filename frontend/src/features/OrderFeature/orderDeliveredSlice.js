import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {};
//paymentResult will come from Paypal
export const deliverOrder = createAsyncThunk(
  'orderDelivered',
  async (order, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
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

const orderDeliverSlice = createSlice({
  name: 'orderDelivered',
  initialState,
  reducers: {
    ORDERS_DELIVER_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay

    [deliverOrder.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [deliverOrder.fulfilled]: (state, action) => {
      return {
        loading: false,
        //ab yahan pr humy koi data nai bhejna balky just paid success ka btana hy
        success: true,
      };
    },

    [deliverOrder.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { ORDERS_DELIVER_RESET } = orderDeliverSlice.actions;
export default orderDeliverSlice.reducer;
