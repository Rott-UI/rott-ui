// React Imports
import {FC, PropsWithChildren} from 'react'

// React Native Imports
import {View, ViewProps, StyleSheet} from 'react-native'

// UI Imports
import {CommonUiProps} from '../../models'

// Style Imports
import {ContentStyles} from '../styles'
import {COLOURS} from '../../../constants'

interface ContentProps extends PropsWithChildren, CommonUiProps, ViewProps {
  row?: boolean
  noPadding?: boolean
  defaultBackgroundColor?: boolean
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
          backgroundColor: defaultBackgroundColor ? COLOURS.GREY900 : backgroundColor,
          includeBorderRadius: true,
          ...props,
        }).defaultContentStyle,
        style,
      ])}
      {...props}>
      {children}
    </View>
  )
}
