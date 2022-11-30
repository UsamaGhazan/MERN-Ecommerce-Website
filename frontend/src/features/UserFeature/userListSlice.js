import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsersList = createAsyncThunk(
  'usersList',
  async (NULL, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo }, //local storage sy userinfo lety hoay... loggedIn user ka pta chal jaeyga
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users`, config);

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
  users: [],
};

export const userListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    USER_LIST_RESET: () => {
      return { users: [] };
    },
  },
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [getUsersList.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [getUsersList.fulfilled]: (state, action) => {
      return {
        loading: false,
        users: action.payload,
      };
    },

    [getUsersList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { USER_LIST_RESET } = userListSlice.actions;
export default userListSlice.reducer;
