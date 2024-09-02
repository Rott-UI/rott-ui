// React Native Imports
import {StyleSheet} from 'react-native'
import {themeConfig} from '../../../providers'

export const ModalStyles = (props?: any) =>
  StyleSheet.create({
    fadedBackgroundStyles: {
      backgroundColor: themeConfig.colors['neutral-alpha-800'],
      justifyContent: 'center',
      alignContent: 'center',
    },
    animatedViewStyles: {
      flexDirection: 'row',
      flex: 1,
      transform: [{translateY: props?.translateY}],

      elevation: 5,
      shadowColor: themeConfig.colors['neutral-shadow-300'],
      shadowOffset: {width: 0, height: -8},
      shadowOpacity: 1,
      shadowRadius: 35,
    },
  })
