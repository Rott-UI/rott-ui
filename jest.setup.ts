import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'
import '@testing-library/jest-native/extend-expect'
import {en} from './src/libs/i18n'
import '@shopify/flash-list/jestSetup'

// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'
import {beforeAll, afterEach, afterAll} from '@jest/globals'

require('react-native-reanimated').setUpTests()

jest.mock('react-native-dotenv', () => {
  return {
    API_BASEURL: 'https://pttwssgt.ptt.gov.tr/pttbankwebtest/services',
    CHANNEL: 'Android',
    IP: '192.168.158.203',
    DEVICE_ID: 'fd5f6836be759ac6',
    BRAND_INFO: 'SAMSUNG - EXYNOS2100 - SAMSUNG',
    IS_EMULATOR: 'true',
    GSM_OPERATOR: 'VODAFONE TR',
    APP_VERSION: '5.0.2.298',
    OPERATING_SYSTEM_VERSION: '13',
  }
})

import {API_BASEURL} from 'react-native-dotenv'

// Clipboard
const ClipboardMock: any = {
  getString: jest.fn().mockResolvedValue('mockString'),
  getImagePNG: jest.fn(),
  getImageJPG: jest.fn(),
  setImage: jest.fn(),
  setString: jest.fn(),
  hasString: jest.fn().mockResolvedValue(true),
  hasImage: jest.fn().mockResolvedValue(true),
  hasURL: jest.fn().mockResolvedValue(true),
  addListener: jest.fn(),
  removeAllListeners: jest.fn(),
}

const useClipboard = jest.fn(() => ['mockString', jest.fn()])

export const RNCClipboardMock: any = {
  ...ClipboardMock,
  useClipboard,
}

jest.mock('@react-native-clipboard/clipboard', () => RNCClipboardMock)

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {countryCode: 'GB', languageTag: 'en-GB', languageCode: 'en', isRTL: false},
    {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
    {countryCode: 'TR', languageTag: 'tr-TR', languageCode: 'tr', isRTL: false},
  ],
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// These two lines of mocking functions are essential to each other. If you do delete second mock function all test render be come null!
// Check out: https://stackoverflow.com/questions/61876682/jest-redux-persist-typeerror-cannot-read-property-catch-of-undefined-at-writ
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist')

  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  }
})
jest.mock('redux-persist/integration/react', () => ({PersistGate: (props: any) => props.children}))

jest.mock('react-native-device-info', () => mockRNDeviceInfo)

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

const mockUseRoute = jest.fn()
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: mockUseRoute,
  }
})
export {mockUseRoute}

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// TODO: MSW Node tarafı kontrol edilecek
export const mockServer = setupServer()
export const mockApiRequest = ({
  url,
  method,
  responseData,
  responseCode = '00',
  status = 200,
}: {
  url: string
  method: Keyof<typeof http>
  responseData: any
  responseCode?: string
  status?: number
}) => {
  const handler = http[method](`${API_BASEURL}${url}`, () => {
    return HttpResponse.json({...responseData, responseCode: responseCode}, {status})
  })

  return mockServer.use(handler)
}

// Establish API mocking before all tests.
beforeAll(() => mockServer.listen())

beforeEach(() => {
  jest.clearAllTimers()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mockServer.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => mockServer.close())

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)
