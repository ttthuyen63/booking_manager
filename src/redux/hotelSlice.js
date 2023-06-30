import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const addhotel = createAsyncThunk("/addhotel", async (arg, thunkApi) => {
  const token = thunkApi.getState().userReducer.token;
  // const res = await customAxios.post(`/orderList.json?auth=${token}`, {
  const res = await customAxios.post(`/hotel`, {
    idhotel: arg.idhotel,
    description: arg.description,
    listURL: arg.listURL,
    hotelID: arg.hotelID,
    hotelNumber: arg.hotelNumber,
    hotelName: arg.hotelName,
    numberBed: arg.numberBed,
    maxQuantity: arg.maxQuantity,
    price: arg.price,
    status: arg.status,
  });
  return res.data;
});

export const getListhotel = createAsyncThunk(
  // "hotelList/getList",
  "/hotel",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.get(`/hotelList.json?auth=${token}`);
    const res = await customAxios.get(`/hotel.json?auth=${token}`);
    return res.data;
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    addListhotel: (state, action) => {
      // const orders = action.payload;
      // return { ...orders };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListhotel.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListhotel.fulfilled, (state, action) => {
        const hotels = action.payload;
        state.loading = false;
        state.data = hotels;
      })
      .addCase(getListhotel.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add hotel
      .addCase(addhotel.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addhotel.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addhotel.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListhotel } = hotelSlice.actions;
export const selectListhotel = (state) => state.hotelReducer;
export default hotelSlice.reducer;
