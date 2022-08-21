import { createSlice } from '@reduxjs/toolkit'
export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: false,
  },
  reducers: {
    changeTheme(state, action) {
      state.isDark = action.payload
    },
  },
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer