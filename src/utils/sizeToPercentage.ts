/* eslint-disable indent */

/**
 *
 * @param {string} size Ekranda verilen boyuta göre yüzde değerinden Width değeri döner. sm: 25%, md: 50%, lg: 75%, xl: 85%, 2xl: 92.5%, full: 100%
 * @returns {string} verilen size değerinin karşılığında yüzde kaç değer geleceğini belirler. Örnek: lg -> 75%
 */
export const sizeToPercentage = (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full') => {
  switch (size) {
    case 'sm':
      return '25%'
    case 'md':
      return '50%'
    case 'lg':
      return '75%'
    case 'xl':
      return '85%'
    case '2xl':
      return '92.5%'
    case 'full':
      return '100%'
  }
}
