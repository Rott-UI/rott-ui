import '@testing-library/jest-native/extend-expect'
import '@shopify/flash-list/jestSetup'
import {en} from './src/libs/i18n'

// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

beforeEach(() => {
  jest.clearAllTimers()
})

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('react-intl', () => {
  const reactIntl = jest.requireActual('react-intl')
  const intl = reactIntl.createIntl({
    locale: 'en-US',
    messages: en,
  })

  return {
    ...reactIntl,
    useIntl: () => intl,
  }
})