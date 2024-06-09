// React Native Imports
import {StyleSheet} from 'react-native'

// Constant Imports
import {Fonts} from '../../../constants'

export const DateInputStyles = () =>
  StyleSheet.create({
    pressableTextStyle: {
      letterSpacing: 2,
      fontFamily: Fonts.MARKPRO_BOLD,
    },
    dateInputHeaderStyle: {
      borderTopStartRadius: 24,
      borderTopEndRadius: 24,
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
