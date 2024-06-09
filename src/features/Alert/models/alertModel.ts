// Component Imports
import {Size, Variant} from '../../models'
import {IconProps} from '../../Icon'
import {LabelProps} from '../../Label'

export interface AlertModel {
  text: string | LabelProps
  size: Size
  variant: Variant
  leftIcon?: IconProps
  rightIcon?: IconProps
}
