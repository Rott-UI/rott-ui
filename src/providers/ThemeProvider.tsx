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
    'white': 'rgba(255, 255, 255, 1)',
    'black': 'rgba(17, 17, 17, 1)',

    // SEMANTIC
    SEMANTIC_DANGER: 'rgba(246, 83, 83, 1)',
    SEMANTIC_SUCCESS: 'rgba(63, 182, 24, 1)',
    SEMANTIC_INFO: 'rgba(63, 182, 210, 1)',
    SEMANTIC_WARNING: 'rgba(255, 117, 24, 1)',
    SEMANTIC_MINT: 'rgba(32, 150, 110, 1)',

    // NEUTRAL/ALPHA
    NEUTRAL_ALPHA900: 'rgba(34, 63, 70, 0.9)',
    NEUTRAL_ALPHA700: 'rgba(34, 63, 70, 0.75)',
    NEUTRAL_ALPHA400: 'rgba(34, 63, 70, 0.40)',
    NEUTRAL_ALPHA300: 'rgba(34, 63, 70, 0.40)',
    NEUTRAL_ALPHA200: 'rgba(34, 63, 70, 0.15)',
    NEUTRAL_ALPHA100: 'rgba(34, 63, 70, 0.10)',
    NEUTRAL_SHADOW300: 'rgba(6, 14, 16, 0.30)',

    NEUTRAL_REDALPHA300: 'rgba(228, 65, 96, 0.30)',
    NEUTRAL_GREENALPHA300: 'rgba(68, 238, 162, 0.30)',
    NEUTRAL_GREYALPHA200: 'rgba(234, 239, 240, 0.15)',
    NEUTRAL_BLUESOFT: 'rgba(130, 222, 243, 1)',
    NEUTRAL_BLUEALPHA300: 'rgba(99, 115, 129, 1)',
    // GRADIENT

    TRANSPARENT: 'rgba(0, 0, 0, 0)',
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
