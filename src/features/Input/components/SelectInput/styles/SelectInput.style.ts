// React Native Imports
import {StyleSheet} from 'react-native'

// Constant Imports
import {COLOURS, Fonts} from '../../../../../constants'

// Util and Lib Imports
import {display, fontSizeNormalizer} from '../../../../../utils'

export const SelectInputStyles = (props?: any) =>
  StyleSheet.create({
    selectInputModalStyle: {
      height: display.setHeight(65),
    },
    pressableTextStyle: {
      letterSpacing: 2,
      width: '90%',
    },
    itemPressableStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    searchInputStyle: {
      backgroundColor: COLOURS.WHITE,
      height: 50,
      width: '100%',
      padding: display.pixelSizeHorizontal(2),
      fontSize: fontSizeNormalizer(props?.fontSize || 16) * 1.2,
      borderRadius: 5,
    },
    closeIcon: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    relative: {
      position: 'relative',
    },
    animatedStyle: {
      flex: 1,
    },
    lineStyle: {
      width: '100%',
    },
    defaultSeparator: {
      height: 1,
      backgroundColor: COLOURS.GREY200,
    },
  })
