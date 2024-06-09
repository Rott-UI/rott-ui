// React Native Imports
import {ViewProps} from 'react-native'

// Component Imports
import {CommonUiProps} from '../../models'
import {ImageTypes} from '../../Image'
import {IconTypes} from '../../Icon'
import {HeaderIconProps} from '../models'
import {PropsWithChildren} from 'react'

export interface HeaderProps extends ViewProps, CommonUiProps, PropsWithChildren {
  back?: boolean
  title?: string
  subTitle?: string
  logo?: ImageTypes | IconTypes
  leftElement?: React.ReactElement | React.ReactNode
  leftIcon?: HeaderIconProps
  rightElement?: React.ReactElement | React.ReactNode
  rightIcon?: HeaderIconProps
  defaultBackgroundColor?: boolean
  paddingHorizontal?: number
  paddingVertical?: number
  goBackFunction?: () => void
}
