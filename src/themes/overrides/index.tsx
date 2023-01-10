import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'
import MuiBUttonGroup from './ButtonGroup'
import Card from './Card'
import MuiContainer from './Container'
import MuiMenu from './Menu'

export default function componentOverrides (theme: ThemeOptions) {
  return merge(
    MuiContainer(),
    Card(),
    MuiMenu(),
    MuiBUttonGroup(),
  )
}