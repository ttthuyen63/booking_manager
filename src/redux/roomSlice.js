import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const addroom = createAsyncThunk("/addroom", async (arg, thunkApi) => {
  const token = thunkApi.getState().userReducer.token;
  // const res = await customAxios.post(`/orderList.json?auth=${token}`, {
  const res = await customAxios.post(`/room`, {
    idRoom: arg.idRoom,
    description: arg.description,
    listURL: arg.listURL,
    hotelID: arg.hotelID,
    roomNumber: arg.roomNumber,
    roomName: arg.roomName,
    numberBed: arg.numberBed,
    maxQuantity: arg.maxQuantity,
    price: arg.price,
    status: arg.status,
  });
  return res.data;
});

export const getListroom = createAsyncThunk(
  "roomList/getList",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    const res = await customAxios.get(`/roomList.json?auth=${token}`);
    return res.data;
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addListroom: (state, action) => {
      // const orders = action.payload;
      // return { ...orders };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListroom.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListroom.fulfilled, (state, action) => {
        const rooms = action.payload;
        state.loading = false;
        state.data = rooms;
      })
      .addCase(getListroom.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add room
      .addCase(addroom.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addroom.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addroom.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListroom } = roomSlice.actions;
export const selectListroom = (state) => state.roomReducer;
export default roomSlice.reducer;
