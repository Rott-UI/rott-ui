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

typeof globalThis
