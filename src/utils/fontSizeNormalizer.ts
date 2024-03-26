/* eslint-disable indent */

import display from './display'

export const fontSizeNormalizer = (
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | number
) => {
  switch (fontSize) {
    case 'xs':
      return display.fontPixel(10)
    case 'sm':
      return display.fontPixel(12)
    case 'md':
      return display.fontPixel(14)
    case 'lg':
      return display.fontPixel(16)
    case 'xl':
      return display.fontPixel(18)
    case 'xxl':
      return display.fontPixel(24)
    case 'xxxl':
      return display.fontPixel(36)
    default:
      return display.fontPixel(fontSize)
  }
}
