// React Imports
import React, {FC} from 'react'

// React Native Imports
import {Animated, Easing, StyleSheet} from 'react-native'

// Component Imports
import {Pressable} from '../../Pressable'
import {Item} from '../../Item'

// Style Imports
import {ToggleStyles} from '../style/Toggle.style'
import {display} from '../../../utils'

// Util and Lib Imports
import {themeConfig} from '../../../providers'

interface ToggleProps {
  testID?: string
  isOn?: boolean
  onToggleChange?: (checked: boolean) => void
  disabled?: boolean
}

export const Toggle: FC<ToggleProps> = ({testID, isOn, onToggleChange, disabled}) => {
  const animatedValue = new Animated.Value(isOn === true ? 1 : 0)
  const moveToggle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [display.px(4), display.px(36)],
  })
  const moveToggleBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [themeConfig.colors['grey-200'], themeConfig.colors['primary']],
  })

  const handleToggle = (isChecked: boolean) => {
    Animated.timing(animatedValue, {
      toValue: isChecked === true ? 1 : 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      onToggleChange!(isChecked)
    })
  }

  return (
    <Item testID={testID} row alignItemsCenter width={64} height={32} maxWidth={64} maxHeight={32}>
      <Pressable
        onPress={() => !disabled && handleToggle!(!isOn)}
        testID='toggle-container-test-id'>
        <Animated.View
          testID='toggle-test-id'
          style={StyleSheet.flatten([
            {
              backgroundColor: moveToggleBackgroundColor,
            },
            ToggleStyles().toggleContainer,
          ])}>
          <Animated.View
            style={StyleSheet.flatten([
              ToggleStyles().toggleWheelStyle,
              {
                marginLeft: moveToggle,
              },
            ])}
          />
        </Animated.View>
      </Pressable>
    </Item>
  )
}
