import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './Slices/ThemeSlice'

const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
})

export default store