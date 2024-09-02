// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {display, fontSizeNormalizer} from '../../../../../utils'
import { themeConfig } from '../../../../../providers'

export const SelectInputStyles = (props?: any) =>
  StyleSheet.create({
    selectInputModalStyle: {
      height: display.setHeight(65),
    },
    pressableTextStyle: {
      // TODO: Android sorunu çözüldükten sonra bakılması gerekiyor.
      letterSpacing: 0.5,
      width: '90%',
    },
    itemPressableStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    searchInputStyle: {
      backgroundColor: themeConfig.colors['white'],
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
      backgroundColor: themeConfig.colors['grey-200'],
    },
  })
