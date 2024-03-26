// Component Imports
import {IconMode, IconTypes, ImageTypes} from '../..'

// React Native Imports
import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native'

export interface BottomMenuItemModel {
  iconName?: IconTypes
  imageName?: ImageTypes
  title?: string
  options?: {
    width?: number
    height?: number
    strokeWidth?: number
    iconMode?: IconMode
    containerStyle?: StyleProp<ViewStyle>
  }
  onPress?: (event: GestureResponderEvent) => void
  url?: string
  phone?: string
}
