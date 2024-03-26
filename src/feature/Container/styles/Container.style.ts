// React Native Imports
import {StyleSheet} from 'react-native'

// Constant Imports
import {COLOURS} from '../../../constants'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'

export const ContainerStyles = ({flex, noPadding, ...props}: any) =>
  StyleSheet.create({
    defaultContainerStyle: {
      ...commonUiStyleProperties(props),

      flex: flex ?? 1,
      paddingHorizontal: noPadding ? 0 : '2.5%',

      backgroundColor:
        !props?.hasDynmicIsland && !props.hasNotch && props?.isModalScreen
          ? COLOURS.GREY900
          : undefined,
    } as any,
  })
