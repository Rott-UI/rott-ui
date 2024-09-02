// React Imports
import {FC, PropsWithChildren} from 'react'

// Util and Lib Imports
import {tr, en} from '../libs/i18n'

// Package Imports
import {IntlProvider} from 'react-intl'
import {themeConfig} from './ThemeProvider'

export const languageMessages = {
  'tr-TR': tr,
  'en-US': en,
}

export const I18nProvider: FC<PropsWithChildren> = ({children}) => {
  const appLanguage = themeConfig.options.appLanguage

  return (
    <IntlProvider
      defaultLocale='en-US'
      locale={appLanguage?.name ?? 'en-US'}
      messages={
        appLanguage?.name
          ? languageMessages[(appLanguage?.name as 'tr-TR') || 'en-US']
          : languageMessages['en-US']
      }>
      {children}
    </IntlProvider>
  )
}
