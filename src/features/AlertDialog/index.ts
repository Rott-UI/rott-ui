export * from './components'
export * from './providers'
export * from './hooks'

// React Imports
import {MutableRefObject, createRef} from 'react'

// Alert Dialog Imports
import {useAlertDialog} from './hooks'
import {AlertDialogModel} from './models'

type AlertDialogService = ReturnType<typeof useAlertDialog>

export const alertDialogRef =
  createRef<AlertDialogService>() as MutableRefObject<AlertDialogService>

export const AlertDialog: AlertDialogService = {
  showAlertDialog: (alertDialog: AlertDialogModel) =>
    alertDialogRef.current?.showAlertDialog(alertDialog),
  hideAlertDialog: () => alertDialogRef.current?.hideAlertDialog(),
}
