/* eslint-disable react/no-unstable-nested-components */
// React Imports
import React, {FC, LegacyRef, Ref} from 'react'

// React Native Imports
import {
  PressableProps as RNPressableProps,
  Pressable as RNPressable,
  StyleProp,
  TextStyle,
  StyleSheet,
  View,
  Animated,
} from 'react-native'

import {Label} from '../../Label'
import {PressableStyles} from '../styles'

// Model Imports
import {CommonUiProps, Size, Variant} from '../../../models'

interface PressableProps extends CommonUiProps, RNPressableProps {
  ref?: LegacyRef<View> | Ref<View | LegacyRef<View>> | any
  row?: boolean
  text?: string
  textStyle?: StyleProp<TextStyle>
  textVariant?: Variant
  textSize?: Size
  textWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold' | 'normal'
  animated?: boolean
}

export const Pressable: FC<PressableProps> = ({
  text,
  textStyle,
  textVariant = 'grey-900',
  textSize = 'md',
  textWeight,
  animated = false,
  children,
  style,
  ref,
  ...props
}) => {
  const PressableContainer: FC<PressableProps> = ({
    children: containerChildren,
    ...containerProps
  }) => {
    if (animated) {
      const AnimatedPressable = Animated.createAnimatedComponent(RNPressable)

      return <AnimatedPressable {...containerProps}>{containerChildren}</AnimatedPressable>
    } else return <RNPressable {...containerProps}>{containerChildren}</RNPressable>
  }

  return (
    <PressableContainer
      animated={animated}
      ref={ref}
      testID='pressable-test-id'
      style={StyleSheet.flatten([
        PressableStyles({
          includeAlignItems: true,
          includeJustifyContent: true,
          ...props,
        }).defaultPressableStyle,
        style,
      ])}
      {...props}>
      {text && (
        <Label style={textStyle} variant={textVariant} fontSize={textSize} fontWeight={textWeight}>
          {text}
        </Label>
      )}

      {!text && <>{children}</>}
    </PressableContainer>
  )
}
