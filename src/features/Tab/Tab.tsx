// React Imports
import {FC} from 'react'

// React Native Imports
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  LayoutChangeEvent,
  GestureResponderEvent,
} from 'react-native'

// Component Imports
import {TabStyle} from './styles'
import {CommonUiProps} from '../../models'

interface TabProps extends TouchableOpacityProps, CommonUiProps {
  title?: string
  isSelected?: boolean
  onPress?: (event: GestureResponderEvent) => void
  onLayout?: (event: LayoutChangeEvent) => void
}

export const Tab: FC<TabProps> = ({title, isSelected, onPress, onLayout, ...props}) => {
  return (
    <TouchableOpacity
      style={TabStyle(props).container}
      onPress={onPress}
      onLayout={onLayout}
      aria-selected={isSelected}
      {...props}>
      <Text style={StyleSheet.flatten([TabStyle({isSelected}).textStyle])}>{title}</Text>
    </TouchableOpacity>
  )
}
