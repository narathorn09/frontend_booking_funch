import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    email: null,
  },
  reducers: {
    setRegister: (state, action) => {
      state.email = action.payload.email;
    },
    removeRegister: (state) => {
      state.email = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRegister, removeRegister } = registerSlice.actions;

export default registerSlice.reducer;
