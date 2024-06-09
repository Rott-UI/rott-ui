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
import {ModalIdEnum} from '../../models/modalIdEnum'

export const AlertDialogProvider: FC<PropsWithChildren> = ({children}) => {
  const {showModal} = useModal({}, [])

  const showAlertDialog = (alertDialogToRender: AlertDialogModel) =>
    showModal({
      id: alertDialogToRender?.id,
      height: 100,
      animationType: 'none',
      transparent: true,
      visible: true,
      disableOutsideClick: true,
      justifyContentCenter: true,
      alignItemsCenter: true,
      children: <AlertDialogComponent {...alertDialogToRender} />,
    })

  const hideAlertDialog = (id?: number) => Modal.hideModal(id)

  const testAlertDialog = () => {
    const testAlertDialogProps: AlertDialogModel = {
      title: 'Test Alanı',
      text: 'Bu bir test alanıdır. Henüz geliştirme aşaması tamamlanmamıştır.',
      id: ModalIdEnum.TestAlertDialog,
    }

    showModal({
      id: ModalIdEnum.TestAlertDialog,
      height: 100,
      animationType: 'none',
      transparent: true,
      visible: true,
      disableOutsideClick: true,
      justifyContentCenter: true,
      alignItemsCenter: true,
      children: <AlertDialogComponent {...testAlertDialogProps} />,
    })
  }

  const contextValue = useMemo(() => {
    return {
      show: showAlertDialog,
      hide: hideAlertDialog,
      test: testAlertDialog,
    }
  }, [showAlertDialog, hideAlertDialog, testAlertDialog])

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
