// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'

export const ItemStyles = (props?: any) =>
  StyleSheet.create({
    defaultItemStyles: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.row ? 'row' : 'column',

      flex: props?.flex ? props?.flex : undefined,
    } as any,
  })
