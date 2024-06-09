// React Native Imports
import {StyleSheet} from 'react-native'
import {COLOURS} from '../../../constants'

export const ModalStyles = (props?: any) =>
  StyleSheet.create({
    fadedBackgroundStyles: {
      backgroundColor: COLOURS.NEUTRAL_ALPHA700,
      justifyContent: 'center',
      alignContent: 'center',
    },
    animatedViewStyles: {
      flexDirection: 'row',
      flex: 1,
      transform: [{translateY: props?.translateY}],

      elevation: 5,
      shadowColor: COLOURS.NEUTRAL_SHADOW300,
      shadowOffset: {width: 0, height: -8},
      shadowOpacity: 1,
      shadowRadius: 35,
    },
  })
