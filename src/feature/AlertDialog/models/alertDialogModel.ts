// Model Imports
import {AlertDialogButtonProps} from './alertDialogButtonProps'

export interface AlertDialogModel {
  title: string
  text?: string
  buttons?: {
    cancelButton?: AlertDialogButtonProps
    confirmButton?: AlertDialogButtonProps
  }
}
