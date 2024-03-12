import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice  = createSlice({
  name: 'token',
  initialState: {
    value: null,
    decode: null
  },
  reducers: {
    setNewToken: (state, action) => {
      state.value = action.payload.newToken;
      state.decode = action.payload.dataDecode;
    },
    removeToken: (state) => {
      state.value = null;
      state.decode = null;
    }

  }
})

// Action creators are generated for each case reducer function
export const { setNewToken, removeToken } = tokenSlice.actions

export default tokenSlice.reducer