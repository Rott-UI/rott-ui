// React Imports
import {FC, PropsWithChildren} from 'react'

// React Native Imports
import {ViewProps, StyleSheet, StatusBar, ScrollView} from 'react-native'

// Constant Imports
import {COLOURS} from '../../../constants'

// Component Imports
import {Pressable} from '../../Pressable'
import {ContainerStyles} from '../styles'
import {CommonUiProps} from '../../models'

// Feature Improts
import {getHasDynamicIslandState, getHasNotchState} from '../../../features/app/appSelector'

// Hook Imports
import {useAppSelector} from '../../../hooks'

// Util and Lib Imports
import {goBack} from '../../../utils'

// Package Imports
import {SafeAreaView} from 'react-native-safe-area-context'

interface ContainerProps extends ViewProps, CommonUiProps, PropsWithChildren {
  center?: boolean
  noPadding?: boolean
  showStatusBar?: boolean
  closeOnClick?: boolean
  disableSafeAreaView?: boolean
  isModalScreen?: boolean
  fullScreen?: boolean
}

export const Container: FC<ContainerProps> = ({
  disableSafeAreaView,
  center,
  noPadding,
  showStatusBar,
  closeOnClick,
  isModalScreen,
  fullScreen,
  height,
  children,
  style,
  ...props
}) => {
  const hasDynamicIsland = useAppSelector(getHasDynamicIslandState)
  const hasNotch = useAppSelector(getHasNotchState)

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={StyleSheet.flatten([
        ContainerStyles({
          center,
          noPadding,
          disableSafeAreaView,
          hasDynamicIsland,
          hasNotch,
          isModalScreen,
          paddingHorizontal: 24,
          height: fullScreen ? '100%' : height,
          includeAlignItems: true,
          includeJustifyContent: true,
          ...props,
        }).defaultContainerStyle,
        style,
      ])}
      {...props}>
      {showStatusBar && <StatusBar barStyle='dark-content' translucent />}
      {!showStatusBar && <StatusBar hidden />}

      {/* TODO: SafeareaView özelliği ImageBackground içindede kullanıldığı için buranın daha sonra gözden geçirilmesi gerekmektedir. */}
      {!disableSafeAreaView && (hasDynamicIsland || hasNotch) && (
        <SafeAreaView style={{backgroundColor: COLOURS.GREY800}} edges={['top']} />
      )}

      {closeOnClick && (
        <Pressable
          backgroundColor='rgba(51, 51, 51, 0.9)'
          style={[StyleSheet.absoluteFill]}
          onPress={goBack}
        />
      )}

      {children}
    </ScrollView>
  )
}
