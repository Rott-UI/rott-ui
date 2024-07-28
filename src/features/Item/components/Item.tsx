// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet, View, ViewProps} from 'react-native'

// Feature Imports
import {SkeletonStyleProps} from '../../Skeleton'
import {ItemStyles} from '../styles'
import {Skeleton} from '../../Skeleton'

// Model Imports
import {CommonUiProps} from '../../../models'

interface ItemProps extends ViewProps, CommonUiProps {
  row?: boolean
  skeletonShow?: boolean
  skeletonStyle?: SkeletonStyleProps
  skeletonTestID?: string
  skeletonNoAnimation?: boolean
  skeletonColors?: (string | number)[]
  skeletonBackgroundColor?: string
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
  skeletonColors,
  skeletonBackgroundColor,
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
          colors={skeletonColors}
          backgroundColor={skeletonBackgroundColor}
        />
      ) : (
        children
      )}
    </View>
  )
}
