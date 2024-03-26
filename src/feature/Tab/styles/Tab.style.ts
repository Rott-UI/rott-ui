// React Native Imports
import {StyleSheet} from 'react-native'

// Constant Imports
import {COLOURS, Fonts} from '../../../constants'

// Util and Lib Imports
import {display} from '../../../utils'
import {commonUiStyleProperties} from '../../utils'

export const TabStyle = (props?: any) =>
  StyleSheet.create({
    container: {
      ...(commonUiStyleProperties(props) as any),

      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontFamily: Fonts.MARKPRO_BOLD,
      fontSize: display.fontPixel(14),
      color: props?.isSelected ? COLOURS.GREY900 : COLOURS.GREY100,
    },
  })
