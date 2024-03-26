// React Native Imports
import {StyleSheet} from 'react-native'

export const ModalStyles = (props?: any) =>
  StyleSheet.create({
    fadedBackgroundStyles: {
      backgroundColor: 'rgba(34,63,70, 0.9)',
      justifyContent: 'center',
      alignContent: 'center',
    },
    animatedViewStyles: {
      flexDirection: 'row',
      flex: 1,
      transform: [{translateY: props?.translateY}],

      elevation: 5,
      shadowColor: 'rgba(6, 14, 16, 0.30)',
      shadowOffset: {width: 0, height: -8},
      shadowOpacity: 1,
      shadowRadius: 35,
    },
  })
