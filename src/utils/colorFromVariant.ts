// Constant Imports
import {themeConfig} from '../providers'

// Model Imports
import {Variant} from '../models'

export const colorFromVariant = (variant: Variant = 'transparent') => {
  return themeConfig.colors[variant]
}
