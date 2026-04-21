import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState:[],
  reducers: {
    addFeedUser: (state, action) => {
      return action.payload;
    },
    removeFeedUser: (state, action) => {
      const newArray=state.filter((item)=>item._id!==action.payload)
      return newArray;
    },
  },
});

export const { addFeedUser, removeFeedUser } = feedSlice.actions;
export default feedSlice.reducer;
