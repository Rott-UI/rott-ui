// React Native Imports
import {GestureResponderEvent} from 'react-native'

// Component Imports
import {IconProps} from '../../Icon'

export interface HeaderIconProps extends Omit<IconProps, 'width' | 'height'> {
  width?: number
  height?: number

  onPress?: (event: GestureResponderEvent) => void
}
