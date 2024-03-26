// React Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'

export const ListStyles = (props?: any) =>
  StyleSheet.create({
    defaultListContainerStyle: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.horizontal ? 'row' : 'column',
    } as any,
    defaultSeparator: {
      width: props.horizontal ? 1 : props.separatorWidth,
      height: props.horizontal ? props.separatorHeight : 1,
    },
  })
