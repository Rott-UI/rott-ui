// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'

export const TimerStyles = (props?: any) =>
  StyleSheet.create({
    defaultTimerContainer: {
      ...commonUiStyleProperties(props),
    } as any,
  })
