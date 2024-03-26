// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'

export const PressableStyles = (props: any) =>
  StyleSheet.create({
    defaultPressableStyle: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.row ? 'row' : 'column',

      flex: props?.flex === 0 ? 0 : 1,
    } as any,
  })
