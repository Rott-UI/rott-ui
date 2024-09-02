// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {display} from '../../../utils'
import {themeConfig} from '../../../providers'

export const ToggleStyles = () =>
  StyleSheet.create({
    toggleContainer: {
      width: display.px(64),
      height: display.px(32),
      borderRadius: 16,
      justifyContent: 'center',
    },
    toggleWheelStyle: {
      width: display.px(23),
      height: display.px(23),
      backgroundColor: themeConfig.colors['white'],
      borderRadius: display.px(12.5),
      borderWidth: display.px(2),
      borderColor: themeConfig.colors['neutral-alpha-200'],
      // shadowColor: COLOURS.BLACK,
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.2,
      // shadowRadius: 2.5,
      // elevation: 1.5,
    },
  })
