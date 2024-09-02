// React Native Imports
import {Platform, StyleSheet} from 'react-native'

// Util and Lib Imports
import {display} from '../../../utils'
import {themeConfig} from '../../../providers'

export const NotificationStyle = (props?: any) =>
  StyleSheet.create({
    linearGradient: {
      backgroundColor: themeConfig.colors['grey-900'], //COLOURS.GREY900,
      width: display.px(343),
      borderBottomEndRadius: display.px(12),
      borderBottomStartRadius: display.px(12),
      borderEndEndRadius: display.px(12),
      borderEndStartRadius: display.px(12),
      borderRadius: display.px(12),
      marginBottom: display.px(16),
      borderWidth: display.px(1),
      borderStyle: 'solid',
      borderColor: props?.variantColor?.replace('0.6', '0.3'),
    },
    blur: {
      width: '100%',
      height: '100%',
      zIndex: 99,
      elevation: Platform.OS === 'android' ? 99 : undefined,
      position: 'absolute',
      backgroundColor: 'rgba(34,63,70, 0.75)',
    },
  })
