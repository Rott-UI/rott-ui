// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {display} from '../../../utils'
import {themeConfig} from '../../../providers'

export const ResultStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: themeConfig.colors['grey-900'],
      position: 'relative',
    },
    bottomContainer: {position: 'absolute', bottom: display.heightPixel(30)},
    list: {minHeight: 2},
  })
