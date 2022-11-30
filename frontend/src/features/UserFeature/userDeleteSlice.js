import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteUser = createAsyncThunk(
  'userDelete',
  async (id, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo }, //local storage sy userinfo lety hoay... loggedIn user ka pta chal jaeyga
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`/api/users/${id}`, config);

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

const initialState = {};

export const userDeleteSlice = createSlice({
  name: 'userDelete',
  initialState,

  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [deleteUser.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [deleteUser.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [deleteUser.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default userDeleteSlice.reducer;
