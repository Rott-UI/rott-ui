// Model Imports
import {AlertDialogModel} from './alertDialogModel'

export interface AlertDialogContextModel {
  showAlertDialog: (alertDialogToRender: AlertDialogModel) => void
  hideAlertDialog: () => void
}
