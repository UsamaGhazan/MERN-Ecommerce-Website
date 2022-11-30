import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { login } from './loginUserSlice';

//sabsy pehly frontend sy backend ko token ki request marein gay login karty hoay
export const getUserDetails = createAsyncThunk(
  'userDetails',
  async (id, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo }, //local storage sy userinfo lety hoay... loggedIn user ka pta chal jaeyga
      } = thunkAPI.getState();
      //jab backend ko data bhej rahy hein to humy header mein content-type bhi btani pary gi ... usky leye config object banaya hy
      //Isi mein hum token b pass karein gay protective routes k leye
      //Header mein token b bhejna hoga is lye Authoriation mein bhejein gay
      const config = {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users/${id}`, config);
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

const initialState = {
  user: {},
};

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    USER_DETAILS_RESET: () => {
      return { user: {} };
    },
  },
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [getUserDetails.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },

    [getUserDetails.fulfilled]: (state, action) => {
      return {
        loading: false,
        user: action.payload,
      };
    },

    [getUserDetails.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { USER_DETAILS_RESET } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
