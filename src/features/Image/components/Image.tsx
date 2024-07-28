// React Imports
import {FC} from 'react'

// React Native Imports
import {
  ImageProps as RNImageProps,
  Image as RNImage,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native'

// Feature Imports Imports
import {ImageStyles} from '../styles'
import {ImageTypes} from '../models'
import {IconTypes} from '../../Icon'

// Model Imports
import {CommonUiProps} from '../../../models'

// Provider Imports
import {themeConfig} from '../../../providers'

interface ImageProps
  extends Omit<RNImageProps, 'name' | 'source'>,
    Omit<CommonUiProps, 'name' | 'borderRadius' | 'width' | 'height'> {
  name?: ImageTypes | IconTypes
  source?: ImageSourcePropType
}
export const Image: FC<ImageProps> = ({variant, size, style, source, name, ...props}) => {
  const imageSource = Object.entries(themeConfig.images).find((image) =>
    !!name ? image[0]?.toLowerCase() === (name as string).toLowerCase() : false
  )

  return (
    <RNImage
      style={StyleSheet.flatten([ImageStyles({variant, size, ...props}).defaultImageStyle, style])}
      source={source ?? themeConfig.images[imageSource?.[0] as never]}
      {...props}
    />
  )
}
