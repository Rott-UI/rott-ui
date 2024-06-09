import {useContext} from 'react'

import {defaultThemeContext} from '../contexts/themeContext'

const defaultThemeContextValue = useContext(defaultThemeContext)
export type Variant = Keyof<typeof defaultThemeContextValue.colors>
