// Package Imports
import {render} from '@testing-library/react-native'

// Provider Imports
import {AppProviders} from '../providers'

/**
 *
 * @param ui
 * @param options.reducers: Reducers nesnesi verildiği taktirde uygulama içinde ki verilen storeları gider değiştirir.
 * @returns
 */
const customRender = (ui: any, options?: any) => render(ui, {wrapper: AppProviders, ...options})

// re-export everything
export * from '@testing-library/react-native'

// override render method
export {customRender as render}
