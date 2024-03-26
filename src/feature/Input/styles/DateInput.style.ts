// React Native Imports
import {StyleSheet} from 'react-native'

// Constant Imports
import {COLOURS, Fonts} from '../../../constants'

export const DateInputStyles = (props?: any) =>
  StyleSheet.create({
    pressableTextStyle: {
      letterSpacing: 2,
      fontFamily: Fonts.MARKPRO_BOLD,
    },
    dateInputHeaderStyle: {
      borderTopStartRadius: 15,
      borderTopEndRadius: 15,
    },
    confirmButtonStyle: {
      position: 'absolute',
      right: '5%',
    },
    cancelButtonStyle: {
      position: 'absolute',
      left: '5%',
    },
  })
