import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { login } from './loginUserSlice';

//sabsy pehly frontend sy backend ko token ki request marein gay login karty hoay
export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async (user, thunkAPI) => {
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
      const { data } = await axios.put(`/api/users/profile`, user, config);
      //Bug Fix: Name update krny pr Navbar mein logout kr k login kry beghair ni hora tha
      // console.log(thunkAPI);
      // thunkAPI.dispatch(login.e);
      // localStorage.setItem('userInfo', JSON.stringify(data));
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

export const updateProfileSlice = createSlice({
  name: 'userLoginReducer',
  initialState,
  // reducers: {
  //   USER_UPDATE_PROFILE_RESET: () => {
  //     return {};
  //   },
  // },
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [updateUserProfile.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [updateUserProfile.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    },

    [updateUserProfile.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
console.log(updateProfileSlice.actions);
export const { USER_UPDATE_PROFILE_RESET } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
