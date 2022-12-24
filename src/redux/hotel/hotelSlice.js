import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { httpsKLTN } from '../../services/axiosClientKLTN';
/** State **/
const initialState = {
  allHotel: [],
  isfetching: false,
};

export const getHotelList = createAsyncThunk('hotel/list', async () => {
  try {
    const res = await httpsKLTN.get('/api/khachsan');
    return res.data;
  } catch (error) {
    message.error(error);
  }
});

const listRoomSlice = createSlice({
  name: 'room/list',
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        allRoom: [],
        isfetching: false,
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getHotelList.pending, (state) => {
        return {
          ...state,

          allRoom: null,
          isfetching: true,
        };
      })
      .addCase(getHotelList.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          allHotel: payload,
        };
      });
  },
});

export const { reset } = listRoomSlice.actions;
export default listRoomSlice.reducer;
