// Component Imports
import {CommonUiProps, Variant} from '../../models'
import {IconTypes} from './iconType'

// Package Imports
import {SvgProps} from 'react-native-svg'

export interface IconProps
  extends Omit<
      SvgProps,
      'color' | 'fontFamily' | 'fontSize' | 'width' | 'height' | 'stroke' | 'strokeWidth' | 'fill'
    >,
    CommonUiProps {
  name: IconTypes
  width?: number
  height?: number
  variant?: Variant
  strokeWidth?: number
  noStroke?: boolean
  mode?: 'stroke' | 'fill'
}
