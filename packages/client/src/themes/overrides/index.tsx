import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'
import MuiBUttonGroup from './ButtonGroup'
import MuiCard from './Card'
import MuiContainer from './Container'
import MuiList from './List'
import MuiMenu from './Menu'
import MuiPopover from './Popover'
import MuiPopper from './Popper'
import MuiSwitch from './Switch'
import MuiTypography from './Typography'

export default function componentOverrides (theme: ThemeOptions) {
  return merge(
    MuiContainer(),
    MuiCard(),
    MuiMenu(),
    MuiBUttonGroup(),
    MuiPopover(),
    MuiPopper(),
    MuiList(),
    MuiSwitch(),
    MuiTypography(),
  )
}