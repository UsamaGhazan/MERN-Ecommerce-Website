import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  loading: true,
  orderItems: [],
  shippingAddress: {},
};
export const getOrderDetails = createAsyncThunk(
  'orderDetails',
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
      const { data } = await axios.get(`/api/orders/${id}`, config);
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

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay

    [getOrderDetails.pending]: (state) => {
      return {
        //...state tab use kr rahy k default value(initial state) milti rahi ta k empty data par error na milay
        ...state,
        loading: true,
      };
    },

    [getOrderDetails.fulfilled]: (state, action) => {
      return {
        loading: false,
        order: action.payload,
      };
    },

    [getOrderDetails.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default orderDetailsSlice.reducer;
