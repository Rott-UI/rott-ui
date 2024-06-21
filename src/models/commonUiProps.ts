import {FontFamily} from '../features/Label/models'
import {Size} from './sizePropType'
import {Variant} from './variant'

export interface CommonUiProps {
  heightNormalizeBased?: boolean
  size?: Size

  width?: number | string
  height?: number | string
  maxWidth?: number | string
  maxHeight?: number | string

  fontSize?: Omit<Size, 'full'> | 'xxxl' | number
  fontFamily?: FontFamily
  color?: string
  variant?: Variant
  flex?: number
  alignItemsCenter?: boolean
  alignItemsFlexStart?: boolean
  alignItemsFlexEnd?: boolean
  alignItemsBaseline?: boolean
  alignItemsStretch?: boolean
  justifyContentCenter?: boolean
  justifyContentFlexStart?: boolean
  justifyContentFlexEnd?: boolean
  justifyContentSpaceAround?: boolean
  justifyContentSpaceBetween?: boolean

  backgroundColor?: string
  borderRadius?: number | string
  borderTopEndRadius?: number | string
  borderTopStartRadius?: number | string
  borderBottomStartRadius?: number | string
  borderBottomEndRadius?: number | string

  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  paddingTop?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number
  paddingVertical?: string | number
  paddingHorizontal?: string | number

  borderWidth?: string | number
  borderColor?: string

  absolute?: boolean
  relative?: boolean
  position?: 'relative' | 'absolute' | undefined
  zIndex?: number
  left?: number
  right?: number
  top?: number
  bottom?: number

  overflowHidden?: boolean

  letterSpacing?: string | number

  flexGrow?: number
  gap?: number
}
