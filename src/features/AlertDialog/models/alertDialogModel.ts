// Model Imports
import {AlertDialogButtonProps} from './alertDialogButtonProps'

export interface AlertDialogModel {
  id?: number
  title: string
  text?: string
  showActivityIndicator?: boolean
  buttons?: {
    cancelButton?: AlertDialogButtonProps
    confirmButton?: AlertDialogButtonProps
  }
}
