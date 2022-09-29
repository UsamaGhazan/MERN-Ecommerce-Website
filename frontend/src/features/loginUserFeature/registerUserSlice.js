import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { login } from './loginUserSlice';

//sabsy pehly frontend sy backend ko token ki request marein gay login karty hoay
export const register = createAsyncThunk(
  'registerUser',
  async ({ name, email, password }, thunkAPI) => {
    try {
      //jab backend ko data bhej rahy hein to humy header mein content-type bhi btani pary gi ... usky leye config object banaya hy
      //Isi mein hum token b pass karein gay protective routes k leye
      const config = {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `/api/users`,
        { name, email, password },
        config
      );
      //Hum chahty hein k jaisy hi user register kary sath hi wo login b hojaye... usky leye login b dispatch kar rahy hein hum
      thunkAPI.dispatch(login({ email, password }));
      //Setting User data to local storage which we are getting from backend
      localStorage.setItem('userInfo', JSON.stringify(data));
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

export const registerUserSlice = createSlice({
  name: 'userLoginReducer',
  initialState,
  extraReducers: {
    //extra reducers sirf async operations k leye hein ... normally reducer use hongay
    [register.pending]: (state) => {
      return {
        loading: true,
      };
    },

    [register.fulfilled]: (state, action) => {
      return {
        loading: false,
        userInfo: action.payload,
      };
    },

    [register.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default registerUserSlice.reducer;
