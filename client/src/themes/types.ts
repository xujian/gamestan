import { ThemeOptions } from '@mui/material'

export type ColorMode = 'dark' | 'light'

export type SchemeBuilder = (mode: ColorMode) => ThemeOptions
