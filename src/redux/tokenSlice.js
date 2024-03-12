import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice  = createSlice({
  name: 'token',
  initialState: {
    value: null
  },
  reducers: {
    setNewToken: (state, action) => {
      state.value = action.payload.newToken
    },
    removeToken: (state) => {
      state.value = null
    }

  }
})

// Action creators are generated for each case reducer function
export const { setNewToken, removeToken } = tokenSlice.actions

export default tokenSlice.reducer