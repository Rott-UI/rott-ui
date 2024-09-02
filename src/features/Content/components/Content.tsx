// React Imports
import {FC, PropsWithChildren} from 'react'

// React Native Imports
import {View, ViewProps, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'

// Feature Imports
import {ContentStyles} from '../styles'

// Model Imports
import {CommonUiProps} from '../../../models'

// Provider Imports
import {themeConfig} from '../../../providers'

// Util and Lib Imports
import {display} from '../../../utils'

interface ContentProps extends PropsWithChildren, CommonUiProps, ViewProps {
  row?: boolean
  noPadding?: boolean
  defaultBackgroundColor?: boolean
  keyboardAvoidingView?: boolean
  keyboardVerticalOffset?: number
  keyboardAvoidingViewContainerPaddingBottom?: number
  scrollEnabled?: boolean
}

export const Content: FC<ContentProps> = ({
  row,
  size,
  noPadding,
  alignItemsCenter,
  justifyContentCenter,
  justifyContentSpaceAround,
  justifyContentSpaceBetween,
  paddingHorizontal = noPadding ? 0 : 24,
  children,
  defaultBackgroundColor,
  backgroundColor,
  style,
  keyboardAvoidingView = false,
  keyboardVerticalOffset = 100,
  keyboardAvoidingViewContainerPaddingBottom = 20,
  scrollEnabled = true,
  ...props
}) => {
  return (
    <View
      style={StyleSheet.flatten([
        ContentStyles({
          size,
          row,
          justifyContentCenter,
          justifyContentSpaceAround,
          justifyContentSpaceBetween,
          alignItemsCenter,
          includeAlignItems: true,
          includeJustifyContent: true,
          paddingHorizontal,
          backgroundColor: defaultBackgroundColor
            ? themeConfig.colors['grey-900']
            : backgroundColor,
          includeBorderRadius: true,
          ...props,
        }).defaultContentStyle,
        style,
      ])}
      {...props}>
      {!keyboardAvoidingView && children}

      {keyboardAvoidingView && (
        <KeyboardAvoidingView
          testID='keyboard-avoiding-view-test-id'
          behavior='padding'
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? display.normalize(keyboardVerticalOffset, 'height') : 0
          }
          enabled>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: display.px(keyboardAvoidingViewContainerPaddingBottom),
            }}
            scrollEnabled={scrollEnabled}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  )
}
