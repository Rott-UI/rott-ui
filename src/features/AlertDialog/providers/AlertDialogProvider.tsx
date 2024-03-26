// React Imports
import {FC, PropsWithChildren, useMemo} from 'react'

// Component Imports
import {Modal, useModal} from '../../Modal'

// Alert Dialog Imports
import {AlertDialogComponent} from '../components'
import {AlertDialogContext} from '../contexts'
import {AlertDialogModel} from '../models'
import {useAlertDialog} from '../hooks'
import {alertDialogRef} from '..'

export const AlertDialogProvider: FC<PropsWithChildren> = ({children}) => {
  const {showModal} = useModal({}, [])

  const showAlertDialog = (alertDialogToRender: AlertDialogModel) =>
    showModal({
      height: 100,
      animationType: 'none',
      transparent: true,
      visible: true,
      disableOutsideClick: true,
      justifyContentCenter: true,
      alignItemsCenter: true,
      children: <AlertDialogComponent {...alertDialogToRender} />,
    })

  const hideAlertDialog = () => Modal.hideModal()

  const contextValue = useMemo(() => {
    return {
      showAlertDialog,
      hideAlertDialog,
    }
  }, [showAlertDialog, hideAlertDialog])

  return (
    <AlertDialogContext.Provider value={contextValue}>
      <InitializeAlertDialogRef />

      {children}
    </AlertDialogContext.Provider>
  )
}

const InitializeAlertDialogRef = () => {
  const alertDialogHook = useAlertDialog()
  alertDialogRef.current = alertDialogHook

  return null
}
