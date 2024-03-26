// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {display} from '../../../utils'

export const NotificationMessageStyle = () =>
  StyleSheet.create({
    container: {
      position: 'relative',
      minHeight: display.heightPixel(90),
    },
    textContainer: {
      maxWidth: display.setWidth(75),
    },
    closePressable: {position: 'absolute', right: 10, top: 10},
  })
