// React Native Imports
import {StyleSheet} from 'react-native'

// Util and Lib Imports
import {commonUiStyleProperties} from '../../utils'
import {themeConfig} from '../../../providers'

export const ContainerStyles = ({flex, noPadding, ...props}: any) =>
  StyleSheet.create({
    defaultContainerStyle: {
      ...commonUiStyleProperties(props),

      flex: flex ?? 1,
      paddingHorizontal: noPadding ? 0 : '2.5%',

      backgroundColor:
        !props?.hasDynmicIsland && !props.hasNotch && props?.isModalScreen
          ? themeConfig.colors['grey-900']
          : undefined,
    } as any,
  })
