import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColorMode } from '../themes/types'
import type { RootState } from './'

interface ThemeState {
  colorMode: ColorMode,
  scheme: string
}

const initialState: ThemeState = {
  colorMode: 'dark',
  scheme: 'klein'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeColorMode: (state, action: PayloadAction<ColorMode>) => {
      state.colorMode = action.payload
    },
    changeScheme: (state, action: PayloadAction<string>) => {
      state.scheme = action.payload
    },
  }
})

export const { changeColorMode, changeScheme } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectColorMode = (state: RootState) => state.theme.colorMode
export const selectScheme = (state: RootState) => state.theme.scheme

export default themeSlice.reducer