import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserDetails } from './userDetailsSlice';

export const updateUser = createAsyncThunk(
  'userUpdate',
  async (user, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo }, //local storage sy userinfo lety hoay... loggedIn user ka pta chal jaeyga
      } = thunkAPI.getState();

      const config = {
        headers: {
          'Cotent-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

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

export const updateUserSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {
    USER_UPDATE_RESET: () => {
      return { user: {} };
    },
  },

  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [updateUser.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [updateUser.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [updateUser.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { USER_UPDATE_RESET } = updateUserSlice.actions;
export default updateUserSlice.reducer;
