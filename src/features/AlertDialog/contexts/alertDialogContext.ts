/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import {createContext} from 'react'

// Alert Dialog Imports
import {AlertDialogContextModel} from '../models'

export const AlertDialogContext = createContext<AlertDialogContextModel>({
  show: () => {},
  hide: (id?: number) => {},
  test: () => {},
})
