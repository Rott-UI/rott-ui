/* eslint-disable indent */
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {colourFromVariant} from '../../../utils'
import {commonUiStyleProperties} from '../../utils'

export const SeparatorStyles = (props?: any) =>
  StyleSheet.create({
    defaultSeparator: {
      ...commonUiStyleProperties(props),

      backgroundColor: colourFromVariant(props?.variant),

      opacity: props?.opacity,
    } as any,
  })
