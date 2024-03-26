import {ThemeContextModel} from '.'
import {defaultThemeContext} from '../contexts/themeContext'

// export type Variant = Keyof<typeof defaultThemeContext.colors>
type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]
export type Variant = PropType<ThemeContextModel, 'colors'>
