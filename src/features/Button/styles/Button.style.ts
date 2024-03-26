/* eslint-disable indent */

// React Imports
import {StyleSheet} from 'react-native'

// Constant Imports
import {Fonts} from '../../../constants'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'
import {colourFromVariant, display, textColourFromVariant} from '../../../utils'
import {buttonSizeNormalizer} from '../../../utils/buttonSizeNormalizer'

export const ButtonStyles = (props?: any) => {
  return StyleSheet.create({
    defaultButtonStyle: {
      ...(commonUiStyleProperties(props) as any),

      position: 'relative',
      flexDirection: 'row',
      flex: props?.flex ? props?.flex : undefined,

      alignItems: 'center',
      color: props?.color,

      borderRadius: 8,
      borderWidth: props?.variant?.includes('outline') ? 2 : undefined,
      borderColor: props?.variant?.includes('outline')
        ? colourFromVariant(props?.variant?.replace('-outline', ''))
        : 'white',

      height:
        typeof props?.height === 'number' ||
        typeof props?.size === 'number' ||
        (typeof props?.size === 'object' && typeof props?.size.height === 'number')
          ? display.px(
              props.size
                ? props.size.height !== undefined
                  ? props.size.height
                  : props.size
                : props.height
            )
          : props.size
          ? buttonSizeNormalizer(
              props?.size
                ? props?.size.height !== undefined
                  ? props?.size.height
                  : props?.size
                : props?.height
            ).height
          : undefined,

      width:
        typeof props?.width === 'number' ||
        typeof props?.size === 'number' ||
        (typeof props?.size === 'object' && typeof props?.size.width === 'number')
          ? display.px(
              props.size
                ? props.size.width !== undefined
                  ? props.size.width
                  : props.size
                : props.width
            )
          : props.size
          ? buttonSizeNormalizer(
              props?.size
                ? props?.size.width !== undefined
                  ? props?.size.width
                  : props?.size
                : props?.width
            ).width
          : undefined,

      justifyContent: 'center',
      opacity: props?.disabled ? 0.6 : 1,
      backgroundColor: colourFromVariant(props?.variant),
    },
    buttonTextStyle: {
      color: textColourFromVariant(props?.variant),
      fontFamily: Fonts.MARKPRO_BOLD,
      textAlignVertical: 'center',
      flexShrink: 1,
    },
  })
}
