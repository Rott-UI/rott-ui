// React Imports
import {useContext, useMemo} from 'react'

// Context Imports
import {AlertDialogContext} from '../contexts'

export const useAlertDialog = () => {
  const {showAlertDialog, hideAlertDialog} = useContext(AlertDialogContext)

  const alertDialogHook = useMemo(
    () => ({
      showAlertDialog,
      hideAlertDialog,
    }),
    [showAlertDialog, hideAlertDialog]
  )

  return alertDialogHook
}
