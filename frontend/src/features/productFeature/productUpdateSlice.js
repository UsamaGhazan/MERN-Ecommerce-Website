import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  product: {},
};

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (product, thunkAPI) => {
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
      //post request kr rahy hein lekin koi data ni bhej rahy is leye empty object bhej rahy
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
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

const productUpdateSlice = createSlice({
  name: 'updateProduct',
  initialState,
  reducers: {
    PRODUCT_UPDATE_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [updateProduct.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [updateProduct.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    },

    [updateProduct.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { PRODUCT_UPDATE_RESET } = productUpdateSlice.actions;
export default productUpdateSlice.reducer;
