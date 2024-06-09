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
  show: (alertDialog: AlertDialogModel) => alertDialogRef.current?.show(alertDialog),
  hide: (id?: number) => alertDialogRef.current?.hide(id),
  test: () => alertDialogRef.current?.test(),
}
