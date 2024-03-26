// React Imports
import {FC, PropsWithChildren, useCallback, useMemo, useState} from 'react'

// Modal Imports
import {ModalContext} from '../contexts'
import {ModalProps} from '../models'
import {ModalComponent} from '../components'
import {useModal} from '../hooks'
import {modalRef} from '..'

export const ModalProvider: FC<PropsWithChildren> = ({children}) => {
  const [modals, setModals] = useState<ModalProps[]>([])

  const showModal = useCallback(
    (modalToRender: ModalProps) =>
      setModals((prevState) => {
        const shouldUpdate = prevState.some((modal) => modal.id === modalToRender?.id)
        if (shouldUpdate) {
          let modalToUpdate = prevState.find((modal) => modal.id === modalToRender.id)

          modalToUpdate!.header = modalToRender!.header
          modalToUpdate!.children = modalToRender!.children
          modalToUpdate = modalToRender

          return [...prevState]
        } else
          return [...prevState, {...modalToRender, id: modalToRender?.id ?? prevState?.length + 1}]
      }),
    [modals, setModals]
  )

  const updateModal = useCallback(
    (modalToRender: ModalProps, id?: number) => {
      setModals((prevState) => {
        const modalToUpdate = prevState.find(
          (modal) => modal.id === id || modal.id === modalToRender?.id
        )

        if (modalToRender && modalToUpdate) {
          modalToUpdate.header = modalToRender?.header ?? modalToUpdate?.header
          modalToUpdate.children = modalToRender?.children ?? modalToUpdate?.children
        }

        return [...prevState]
      })
    },
    [modals]
  )

  const hideModal = useCallback(
    (id?: number) => {
      const modalsAfterDelete = modals?.filter((modal): any =>
        id ? modal.id !== id : modal.id !== modals.length
      )

      setModals(modalsAfterDelete)
    },
    [modals]
  )

  const hasModalById = (id: number) => modals.some((modal) => modal.id === id)

  const contextValues = useMemo(() => {
    return {
      modals,
      showModal,
      updateModal,
      hideModal,
      hasModalById,
      hideAllModal: () => {},
    }
  }, [modals, showModal, updateModal, hideModal, hasModalById])

  return (
    <ModalContext.Provider value={contextValues}>
      <InitializeModalRef />
      {children}

      {modals && <ModalComponent {...modals[0]} modals={modals} />}
    </ModalContext.Provider>
  )
}

const InitializeModalRef = () => {
  const modalHook = useModal()
  modalRef.current = modalHook

  return null
}
