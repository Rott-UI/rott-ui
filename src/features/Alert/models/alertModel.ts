// Feature Imports
import {IconProps} from '../../Icon'
import {LabelProps} from '../../Label'

// Model Imports
import {Size, Variant} from '../../../models'

export interface AlertModel {
  text: string | LabelProps
  size: Size
  variant: Variant
  leftIcon?: IconProps
  rightIcon?: IconProps
}
