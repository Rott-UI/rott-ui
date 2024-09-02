// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {display} from '../../../utils'
import {commonUiStyleProperties} from '../../utils'
import {themeConfig} from '../../../providers'

export const TabStyle = (props?: any) =>
  StyleSheet.create({
    container: {
      ...(commonUiStyleProperties(props) as any),

      width: display.px(159.5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      // TODO: font eklendikten sonra duzenlenecek
      // fontFamily: Fonts.MARKPRO_BOLD,
      fontSize: 14,
      color: props?.isSelected ? themeConfig.colors['grey-900'] : themeConfig.colors['grey-100'],
    },
  })
