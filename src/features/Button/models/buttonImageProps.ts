// React Native Imports
import {ImageResizeMode} from 'react-native'

// Component Imports
import {ImageTypes} from '../../Image'

export interface ButtonImageProps {
  name?: ImageTypes
  resizeMode?: ImageResizeMode
  tintColor?: string
  width?: number
  height?: number
  absolute?: boolean
}
