/* eslint-disable indent */

// Component Imports

// Constant Imports
import {defaultThemeContext} from '../contexts/themeContext'
import {Variant} from '../models/variant'

export const colourFromVariant = (variant: Variant = 'primary') => {
  switch (variant) {
    case 'primary':
      return defaultThemeContext.colors.primary
  }
}
