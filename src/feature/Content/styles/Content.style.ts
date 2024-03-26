// React-Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'

export const ContentStyles = (props?: any) =>
  StyleSheet.create({
    defaultContentStyle: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.row ? 'row' : 'column',

      flex: props?.flex,
    } as any,
  })
