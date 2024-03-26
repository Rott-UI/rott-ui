// React Native Imports
import {Animated} from 'react-native'

// Component Imports
import {Variant} from '../../models'
import {IconTypes} from '../..'
import {FontFamily} from '../../Label/models'

// Package Imports
import {Swipeable} from 'react-native-gesture-handler'

export interface ListItemProps {
  testID?: string
  index?: number
  icon?: IconTypes
  title: string
  subTitle?: string
  rightIcon?: IconTypes
  titleColor?: Variant
  iconColor?: Variant
  rightIconColor?: Variant
  fontFamily?: FontFamily
  backgroundColor?: Variant
  favorite?: boolean
  swipeable?: boolean
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
  onAction?: () => void | undefined
}
