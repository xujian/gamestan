import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface LayoutState {
  isAsideOpen: boolean
}

const initialState: LayoutState = {
  isAsideOpen: false
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openAside: (state) => {
      state.isAsideOpen = true
    },
    closeAside: (state) => {
      state.isAsideOpen = false
    },
    toggleAside: (state) => {
      state.isAsideOpen = !state.isAsideOpen
    },
  }
})

export const { openAside, closeAside, toggleAside } = layoutSlice.actions

export const selectIsAsideOpen = (state: RootState) => state.layout.isAsideOpen

export default layoutSlice.reducer