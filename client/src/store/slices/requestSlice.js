import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
        const newArray=state.filter((item)=>item._id!==action.payload)
        return newArray
    },
  },
});

export const { addConnection, removeConnection } = requestSlice.actions;
export default requestSlice.reducer;
