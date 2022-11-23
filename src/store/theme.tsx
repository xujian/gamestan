import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './'

type ColorMode = 'dark' | 'light'

interface ThemeState {
  colorMode: ColorMode
}

const initialState: ThemeState = {
  colorMode: 'dark'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeColorMode: (state, action: PayloadAction<ColorMode>) => {
      state.colorMode = action.payload
    },
  }
})

export const { changeColorMode } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectColorMode = (state: RootState) => state.theme.colorMode

export default themeSlice.reducer