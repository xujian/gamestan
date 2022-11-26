import { configureStore } from '@reduxjs/toolkit'
import theme from './theme'
import layout from '../layouts/master/layout.slice'

const store = configureStore({
  reducer: {
    theme,
    layout,
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
