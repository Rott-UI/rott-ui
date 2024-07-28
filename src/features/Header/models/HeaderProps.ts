// React Native Imports
import {ViewProps} from 'react-native'

// Feature Imports Imports

import {ImageTypes} from '../../Image'
import {IconTypes} from '../../Icon'
import {HeaderIconProps} from '../models'
import {PropsWithChildren} from 'react'
import {LabelProps} from '../../Label'

// Model Imports
import {CommonUiProps} from '../../../models'

export interface HeaderProps extends ViewProps, CommonUiProps, PropsWithChildren {
  back?: boolean
  title?: string | LabelProps
  subTitle?: string | LabelProps
  logo?: ImageTypes | IconTypes
  leftElement?: React.ReactElement | React.ReactNode
  leftIcon?: HeaderIconProps & {rounded?: boolean}
  rightElement?: React.ReactElement | React.ReactNode
  rightIcon?: HeaderIconProps & {rounded?: boolean}
  defaultBackgroundColor?: boolean
  paddingHorizontal?: number
  paddingVertical?: number
  goBackFunction?: () => void
}
