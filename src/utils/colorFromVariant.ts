// Constant Imports
import {themeConfig} from '../providers'

// Model Imports
import {Variant} from '../models'

export const colorFromVariant = (variant: Variant = 'transparent') => {
  return themeConfig.colors[variant]
}

export const textColourFromVariant = (variant: Variant = 'primary') => {
  switch (variant) {
    // OUTLINE MAIN
    case 'primary-outline':
      return themeConfig.colors.primary
    case 'secondary-outline':
      return themeConfig.colors.secondary
    case 'white':
    case 'grey-100':
    case 'info':
      return themeConfig.colors['grey-900']

    // OUTLINE SEMANTIC
    case 'danger-outline':
      return themeConfig.colors.danger
    case 'success-outline':
      return themeConfig.colors.success
    case 'info-outline':
      return themeConfig.colors.info
    case 'warning-outline':
      return themeConfig.colors.warning

    default:
      return themeConfig.colors.white
  }
}
