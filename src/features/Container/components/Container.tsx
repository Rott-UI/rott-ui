// React Imports
import {FC, PropsWithChildren} from 'react'

// React Native Imports
import {ViewProps, StyleSheet, StatusBar, ScrollView, SafeAreaView} from 'react-native'

// Constant Imports

// Component Imports
import {Pressable} from '../../Pressable'
import {ContainerStyles} from '../styles'

// Feature Improts

// Model Imports
import {CommonUiProps} from '../../../models'
import {themeConfig} from '../../../providers'

// Util and Lib Imports

interface ContainerProps extends ViewProps, CommonUiProps, PropsWithChildren {
  center?: boolean
  noPadding?: boolean
  showStatusBar?: boolean
  closeOnClick?: boolean
  disableSafeAreaView?: boolean
  safeAreaViewColor?: string
  isModalScreen?: boolean
  fullScreen?: boolean
}

export const Container: FC<ContainerProps> = ({
  disableSafeAreaView,
  safeAreaViewColor,
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
  const hasDynamicIsland = themeConfig.options.hasDynamicIsland
  const hasNotch = themeConfig.options.hasNotch

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
        <SafeAreaView
          style={{backgroundColor: safeAreaViewColor ?? themeConfig.colors['grey-800']}}
        />
      )}

      {closeOnClick && (
        <Pressable
          backgroundColor={themeConfig.colors['neutral-alpha-900']}
          style={[StyleSheet.absoluteFill]}
          // TODO: Route işlemi için bu press'in zorunlu prop'u olmalı
          onPress={() => {}}
        />
      )}

      {children}
    </ScrollView>
  )
}
