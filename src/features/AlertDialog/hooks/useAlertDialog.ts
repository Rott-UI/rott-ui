// React Imports
import {useContext, useMemo} from 'react'

// Context Imports
import {AlertDialogContext} from '../contexts'

export const useAlertDialog = () => {
  const {show, hide, test} = useContext(AlertDialogContext)

  const alertDialogHook = useMemo(
    () => ({
      show,
      hide,
      test,
    }),
    [show, hide, test]
  )

  return alertDialogHook
}
