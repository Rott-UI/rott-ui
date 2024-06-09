// React Imports
import {ReactNode} from 'react'

// Component Imports
import {ImageTypes} from '../../Image'
import {Size, Variant} from '../../models'
import {FontFamily, FontWeight} from '../../Label/models'

interface EmptyStateLabelProps {
  testID?: string
  fontSize?: Size
  fontFamily?: FontFamily
  fontWeight?: FontWeight
  variant?: Variant
  text?: string
}

export interface EmptyStateProps {
  description?: string | EmptyStateLabelProps | ReactNode
  title?: string | EmptyStateLabelProps | ReactNode
  name?: ImageTypes
  testID?: string
  background?: string
  backgroundColor?: string
  width?: number
  height?: number
}
