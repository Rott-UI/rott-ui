// React Native Imports
import {StyleSheet} from 'react-native'

// Constant Imports
import {COLOURS} from '../../../constants'

// Util and Lib Imports
import {display} from '../../../utils'

export const ResultStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: COLOURS.GREY900,
      position: 'relative',
    },
    bottomContainer: {position: 'absolute', bottom: display.heightPixel(30)},
    list: {minHeight: 2},
  })
