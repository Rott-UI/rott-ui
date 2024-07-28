import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {colorFromVariant} from '../../../utils'
import {commonUiStyleProperties} from '../../utils'

export const SeparatorStyles = (props?: any) =>
  StyleSheet.create({
    defaultSeparator: {
      ...commonUiStyleProperties(props),

      backgroundColor: colorFromVariant(props?.variant),

      opacity: props?.opacity,
    } as any,
  })
