// Component Imports
import {Theme} from '../../../models'
import {Size, Variant} from '../../models'
import {FontFamily} from '../../Label/models'
import {InputLabelIconProps} from './inputLabelIconProps'

export interface InputLabelProps {
  text: string
  variant?: Variant
  description?: string
  size?: Size
  descriptionSize?: Size
  descriptionVariant?: Variant
  theme?: Theme
  fontFamily?: FontFamily

  icon?: InputLabelIconProps
}
