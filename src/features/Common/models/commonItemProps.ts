// React Native Imports
import {Animated} from 'react-native'

// Component Imports
import {CommonUiProps, Variant} from '../../../models'
import {IconProps, IconTypes} from '../..'
import {LabelProps} from '../../Label/models'

// Package Imports
import {Swipeable} from 'react-native-gesture-handler'
import {ReactNode} from 'react'

export interface CommonItemProps extends CommonUiProps {
  testID?: string
  index?: number
  width?: number
  height?: number
  backgroundColor?: Variant

  leftIcon?: IconTypes | IconProps
  rightIcon?: IconTypes | IconProps

  title: string | LabelProps | ReactNode
  subTitle?: string | LabelProps | ReactNode
  description?: string | LabelProps | ReactNode

  showSelected?: boolean
  selected?: boolean
  swipeable?: boolean
  favorite?: boolean

  renderRightActions?: (
    progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    swipeable: Swipeable
  ) => React.ReactNode
  renderLeftActions?: (
    progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    swipeable: Swipeable
  ) => React.ReactNode
  onPress?: (value?: any) => void | undefined
  value?: any
}
