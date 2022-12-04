import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'
import CardContent from './CardContent'

export default function componentOverrides (theme: ThemeOptions) {
  return merge(
    CardContent()
  )
}