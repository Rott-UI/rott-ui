// React Native Imports
import {StyleSheet} from 'react-native'

export const DateInputStyles = () =>
  StyleSheet.create({
    pressableTextStyle: {
      letterSpacing: 2,
      // TODO: Font dosyasi eklendikten sonra aktif edilecek
      // fontFamily: Fonts.MARKPRO_BOLD,
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
