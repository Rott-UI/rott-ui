/* eslint-disable indent */

export const fontSizeNormalizer = (
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | number
) => {
  switch (fontSize) {
    case 'xs':
      return 10
    case 'sm':
      return 12
    case 'md':
      return 14
    case 'lg':
      return 16
    case 'xl':
      return 18
    case 'xxl':
      return 24
    case 'xxxl':
      return 36
    default:
      return fontSize
  }
}
