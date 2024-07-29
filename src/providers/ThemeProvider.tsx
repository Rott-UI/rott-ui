// React Imports
import {FC, PropsWithChildren} from 'react'

// Context Imports
import {ThemeContext} from '../contexts'

export let themeConfig = {
  colors: {
    // PRIMARY
    primary: 'rgba(63, 182, 210, 1)',
    secondary: 'rgba(255, 199, 44, 1)',
    'grey-900': 'rgba(34, 63, 70, 1)',
    'grey-800': 'rgba(61, 88, 94, 1)',
    'grey-200': 'rgba(161, 173, 175, 1)',
    'grey-100': 'rgba(234, 239, 240, 1)',
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(17, 17, 17, 1)',

    // SEMANTIC
    danger: 'rgba(246, 83, 83, 1)',
    success: 'rgba(63, 182, 24, 1)',
    info: 'rgba(63, 182, 210, 1)',
    warning: 'rgba(255, 117, 24, 1)',
    mint: 'rgba(32, 150, 110, 1)',

    // NEUTRAL/ALPHA
    'neutral-alpha-900': 'rgba(34, 63, 70, 0.9)',
    'neutral-alpha-800': 'rgba(34, 63, 70, 0.75)',
    'neutral-alpha-400': 'rgba(34, 63, 70, 0.40)',
    'neutral-alpha-300': 'rgba(34, 63, 70, 0.30)',
    'neutral-alpha-200': 'rgba(34, 63, 70, 0.15)',
    'neutral-alpha-100': 'rgba(34, 63, 70, 0.10)',
    'neutral-shadow-300': 'rgba(6, 14, 16, 0.30)',

    'neutral-red-alpha-300': 'rgba(228, 65, 96, 0.30)',
    'neutral-green-alpha-300': 'rgba(68, 238, 162, 0.30)',
    'neutral-grey-alpha-200': 'rgba(234, 239, 240, 0.15)',
    'neutral-blue-soft': 'rgba(130, 222, 243, 1)',
    'neutral-blue-alpha': 'rgba(99, 115, 129, 1)',
    // GRADIENT

    transparent: 'rgba(0, 0, 0, 0)',
  },
  texts: {},
  images: {},
  icons: {
    ARROW_DOWN: require('../assets/icons/arrow-down.png'),
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 24,
    '3xl': 36,
  },
}

interface ThemeProviderProps extends PropsWithChildren {
  config?: any
}

export const ThemeProvider: FC<ThemeProviderProps> = ({config, children}) => {
  if (config) {
    themeConfig = {...themeConfig, ...config}
  }

  return <ThemeContext.Provider value={themeConfig}>{children}</ThemeContext.Provider>
}
