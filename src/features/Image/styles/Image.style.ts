// React-Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'

export const ImageStyles = (props?: any) =>
  StyleSheet.create({
    defaultImageStyle: {
      ...commonUiStyleProperties(props),

      resizeMode: 'contain',
    } as any,
  })
