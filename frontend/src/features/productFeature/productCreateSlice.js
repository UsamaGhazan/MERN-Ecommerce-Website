import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const createProduct = createAsyncThunk(
  'createProduct',
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
      //post request kr rahy hein lekin koi data ni bhej rahy is leye empty object bhej rahy
      const { data } = await axios.post(`/api/products`, {}, config);
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

const productCreateSlice = createSlice({
  name: 'createProduct',
  initialState,
  reducers: {
    PRODUCT_CREATE_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [createProduct.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [createProduct.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    },

    [createProduct.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { PRODUCT_CREATE_RESET } = productCreateSlice.actions;
export default productCreateSlice.reducer;
