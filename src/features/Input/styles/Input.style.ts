// React-Native Imports
import {StyleSheet} from 'react-native'

// Constant Imports

// Util Imports
import {commonUiStyleProperties} from '../../utils'
import {InputStyleNormalizer} from '../utils/inputNormalizer'
import {themeConfig} from '../../../providers'
import {fontSizeNormalizer} from '../../../utils'

export const InputStyles = (props?: any) =>
  StyleSheet.create({
    textInputContainer: {
      opacity: props?.disabled ? 0.3 : 1,
    },
    defaultTextInputStyle: {
      ...commonUiStyleProperties(props),

      width: '100%',
      height: InputStyleNormalizer({size: props?.size}).height,
      fontSize: props?.fontSize
        ? themeConfig.fontSizes[props?.fontSize as keyof typeof themeConfig.fontSizes]
        : fontSizeNormalizer(InputStyleNormalizer({size: props?.size}).placeholderSize),
      color: props?.theme === 'light' ? themeConfig.colors['grey-900'] : themeConfig.colors.white,

      // TODO: Android sorunu çözüldükten sonra bakılması gerekiyor.
      letterSpacing: props?.letterSpacing ?? 0.5,
      // TODO: Font eklendikten sonra aktif edilecek.
      //fontFamily: Fonts.MARKPRO_MEDIUM,
    } as any,
  })
