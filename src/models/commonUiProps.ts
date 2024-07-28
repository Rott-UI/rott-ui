import {FontFamily, FontWeight} from '../features/Label/models'
import {Size} from './size'
import {Variant} from './variant'

export interface CommonUiProps {
  heightNormalizeBased?: boolean
  size?: Size

  width?: number | string
  height?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
  minWidth?: number | string
  minHeight?: number | string

  fontSize?: Omit<Size, 'full'> | number
  fontFamily?: FontFamily
  fontWeight?: FontWeight
  color?: string
  variant?: Variant

  flex?: number
  flexGrow?: number
  flexShrink?: number

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

  gap?: number
}
