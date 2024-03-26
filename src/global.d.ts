declare module 'react-native-device-info/jest/react-native-device-info-mock'

type Nullable<T> = null | T

interface String {
  isEmpty: () => boolean
  toSeoFriendly: () => string
}

/**
 * İstenilen tipi **typeof** olarak verirseniz objenin içinde ki tüm keyleri alacak şekilde nesne türetir.
 *
 * Örnek;
 * ```
 * import en from '@libs/i18n'
 *
 * keyof typeof en
 * ```
 * **translator** ve Icon elementinin **name** propertysine bakılabilir.
 *
 */
type Keyof<T> = keyof T

import('./../node_modules/react-native-reanimated/src/reanimated2/globals')
typeof globalThis
