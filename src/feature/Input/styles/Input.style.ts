// React-Native Imports
import {StyleSheet} from 'react-native'

// Constant Imports
import {COLOURS, Fonts} from '../../../constants'

// Util Imports
import {fontSizeNormalizer, sizeToPercentage} from '../../../utils'
import {commonUiStyleProperties} from '../../utils'
import {InputStyleNormalizer} from '../utils/inputNormalizer'

export const InputStyles = (props?: any) =>
  StyleSheet.create({
    textInputContainer: {
      width: sizeToPercentage(props?.size),
    },
    defaultTextInputStyle: {
      ...commonUiStyleProperties(props),

      width: '100%',
      height: InputStyleNormalizer({size: props?.size}).height,
      fontSize: props?.fontSize
        ? fontSizeNormalizer(props?.fontSize)
        : fontSizeNormalizer(InputStyleNormalizer({size: props?.size}).placeholderSize),
      color: props?.theme === 'light' ? COLOURS.GREY900 : COLOURS.WHITE,

      letterSpacing: props?.letterSpacing ?? 2,
      fontFamily: Fonts.MARKPRO_MEDIUM,
    } as any,
  })
