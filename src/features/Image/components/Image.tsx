// React Imports
import {FC} from 'react'

// React Native Imports
import {
  ImageProps as RNImageProps,
  Image as RNImage,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native'

import {CommonUiProps} from '../../models'

// Style Imports
import {ImageStyles} from '../styles'
import {ImageTypes} from '../models'
import {Images} from '../../../constants'
import {IconTypes} from '../../Icon'

interface ImageProps
  extends Omit<RNImageProps, 'name' | 'source'>,
    Omit<CommonUiProps, 'name' | 'borderRadius' | 'width' | 'height'> {
  name?: ImageTypes | IconTypes // TODO: KONTROL
  source?: ImageSourcePropType
}
export const Image: FC<ImageProps> = ({variant, size, style, source, name, ...props}) => {
  const imageSource = Object.entries(Images).find(
    (image) => image[0]?.toLowerCase() === name?.toLowerCase()
  )

  return (
    <RNImage
      style={StyleSheet.flatten([ImageStyles({variant, size, ...props}).defaultImageStyle, style])}
      source={source ?? Images[imageSource?.[0] as never]}
      {...props}
    />
  )
}
