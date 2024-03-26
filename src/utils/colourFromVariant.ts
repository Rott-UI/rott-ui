/* eslint-disable indent */

// Component Imports
import {Variant} from '../components/models'

// Constant Imports
import {COLOURS} from '../constants'

export const colourFromVariant = (variant: Variant = 'primary') => {
  switch (variant) {
    case 'primary':
      return COLOURS.PRIMARY
    case 'secondary':
      return COLOURS.SECONDARY
    case 'grey-900':
      return COLOURS.GREY900
    case 'grey-800':
      return COLOURS.GREY800
    case 'grey-200':
      return COLOURS.GREY200
    case 'grey-100':
      return COLOURS.GREY100

    case 'white':
      return COLOURS.WHITE
    case 'black':
      return COLOURS.BLACK

    // SEMANTIC COLOURS
    case 'success':
      return COLOURS.SEMANTIC_SUCCESS
    case 'info':
      return COLOURS.SEMANTIC_INFO
    case 'warning':
      return COLOURS.SEMANTIC_WARNING
    case 'danger':
      return COLOURS.SEMANTIC_DANGER
    case 'mint':
      return COLOURS.SEMANTIC_MINT

    // NEUTRAL/ALPHA
    case 'neutral-alpha-700':
      return COLOURS.NEUTRAL_ALPHA700
    case 'neutral-alpha-400':
      return COLOURS.NEUTRAL_ALPHA400
    case 'neutral-alpha-300':
      return COLOURS.NEUTRAL_ALPHA300
    case 'neutral-alpha-200':
      return COLOURS.NEUTRAL_ALPHA200
    case 'neutral-alpha-100':
      return COLOURS.NEUTRAL_ALPHA100
    case 'neutral-red-alpha-300':
      return COLOURS.NEUTRAL_REDALPHA300
    case 'neutral-green-alpha-300':
      return COLOURS.NEUTRAL_GREENALPHA300
    case 'neutral-grey-alpha-200':
      return COLOURS.NEUTRAL_GREYALPHA200
    case 'neutral-blue-soft':
      return COLOURS.NEUTRAL_BLUESOFT

    case 'transparent':
      return COLOURS.TRANSPARENT

    case 'primary-outline':
    case 'secondary-outline':
    case 'success-outline':
    case 'info-outline':
    case 'warning-outline':
    case 'danger-outline':
    case 'white-outline':
      return 'transparent'

    case 'none':
      return COLOURS.GREY200
  }
}

export const textColourFromVariant = (variant: Variant = 'primary') => {
  switch (variant) {
    // OUTLINE MAIN
    case 'primary-outline':
      return COLOURS.PRIMARY
    case 'secondary-outline':
      return COLOURS.SECONDARY
    case 'white':
    case 'info':
      return COLOURS.GREY900

    // OUTLINE SEMANTIC
    case 'danger-outline':
      return COLOURS.SEMANTIC_DANGER
    case 'success-outline':
      return COLOURS.SEMANTIC_SUCCESS
    case 'info-outline':
      return COLOURS.SEMANTIC_INFO
    case 'warning-outline':
      return COLOURS.SEMANTIC_WARNING

    default:
      return COLOURS.WHITE
  }
}
