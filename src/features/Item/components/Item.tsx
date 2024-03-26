/* eslint-disable react/no-unstable-nested-components */
// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet, View, ViewProps} from 'react-native'

// Component Imports
import {CommonUiProps} from '../../models'
import {ItemStyles} from '../styles'
import {Skeleton} from '../../Skeleton'

// Model Imports
import {SkeletonStyleProps} from '../../Skeleton/models'

interface ItemProps extends ViewProps, CommonUiProps {
  row?: boolean
  skeletonShow?: boolean
  skeletonStyle?: SkeletonStyleProps
  skeletonTestID?: string
  skeletonNoAnimation?: boolean
}

// TODO: Animated View sonra incelenecek
export const Item: FC<ItemProps> = ({
  row,
  size,
  gap,
  style,
  children,
  skeletonShow = false,
  skeletonStyle,
  skeletonTestID,
  skeletonNoAnimation = false,
  ...props
}) => {
  return (
    <View
      {...props}
      style={StyleSheet.flatten([
        ItemStyles({
          row,
          includeAlignItems: true,
          includeJustifyContent: true,
          size,
          gap,
          ...props,
        }).defaultItemStyles,
        style,
      ])}>
      {skeletonShow && skeletonStyle ? (
        <Skeleton
          testID={skeletonTestID}
          show={skeletonShow}
          width={skeletonStyle.width}
          height={skeletonStyle.height}
          radius={skeletonStyle?.radius}
          noAnimation={skeletonNoAnimation}
        />
      ) : (
        children
      )}
    </View>
  )
}
