// React Imports
import React, {FC} from 'react'
import {View, StyleSheet, ViewProps} from 'react-native'

// Component Imports
import {SeparatorStyles} from '../styles'
import {CommonUiProps} from '../../models'

interface SeparatorProps extends ViewProps, CommonUiProps {
  height?: number | string
  width?: number | string
  orientation?: 'vertical' | 'horizontal'
  opacity?: number
}

export const Separator: FC<SeparatorProps> = ({
  height = 1,
  width = 1,
  style,
  size,
  orientation = 'horizontal',
  opacity = 1,
  ...props
}) => (
  <View
    style={StyleSheet.flatten([
      SeparatorStyles({
        height: orientation === 'vertical' && size ? undefined : height,
        width: orientation === 'horizontal' && size ? undefined : width,
        size,
        orientation,
        opacity,
        ...props,
      }).defaultSeparator,
      style,
    ])}
    {...props}
  />
)
