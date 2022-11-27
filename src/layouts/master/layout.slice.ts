import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface LayoutState {
  isNavOpen: boolean
}

const initialState: LayoutState = {
  isNavOpen: false
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openNav: (state) => {
      state.isNavOpen = true
    },
    closeNav: (state) => {
      state.isNavOpen = false
    },
    toggleNav: (state) => {
      state.isNavOpen = !state.isNavOpen
    },
  }
})

export const { openNav, closeNav, toggleNav } = layoutSlice.actions

export const selectIsNavOpen = (state: RootState) => state.layout.isNavOpen

export default layoutSlice.reducer