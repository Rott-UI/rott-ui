/* eslint-disable indent */

export const fontSizeNormalizer = (
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number
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
    case '2xl':
      return 24
    case '3xl':
      return 36
    default:
      return fontSize
  }
}
