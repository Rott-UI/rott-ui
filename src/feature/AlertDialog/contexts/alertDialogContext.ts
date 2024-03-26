//
import {createContext} from 'react'
import {AlertDialogContextModel} from '../models'

export const AlertDialogContext = createContext<AlertDialogContextModel>({
  showAlertDialog: () => {},
  hideAlertDialog: () => {},
})
