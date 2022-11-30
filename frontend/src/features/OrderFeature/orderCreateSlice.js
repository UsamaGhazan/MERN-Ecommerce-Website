import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};
export const createOrder = createAsyncThunk(
  'createOrder',
  async (order, thunkAPI) => {
    try {
      const {
        //userLogin .getState() sy nikalo aur userInfo variable usy day do
        userLogin: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/orders`, order, config);
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

const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState,
  reducers: {
    ORDER_CREATE_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [createOrder.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [createOrder.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    },

    [createOrder.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { ORDER_CREATE_RESET } = orderCreateSlice.actions;
export default orderCreateSlice.reducer;
