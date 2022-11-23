import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme'

const store = configureStore({
  reducer: {
    theme: themeReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch