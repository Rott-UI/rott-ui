/* eslint-disable no-console */
// React Imports
import {useContext, useEffect, useMemo, useRef} from 'react'

// Modal Imports
import {ModalContext} from '../contexts'
import {ModalProps} from '../models'

export const useModal = (modalToRender?: ModalProps, modalDependencies?: any[]) => {
  const {modals, showModal, updateModal, hideModal, hasModalById, hideAllModal} =
    useContext(ModalContext)

  const prevDeps = useRef(modalDependencies)
  if (!isShallowEqual(prevDeps.current, modalDependencies)) prevDeps.current = modalDependencies

  const modalHook = useMemo(
    () => ({
      modals,
      showModal: (modalOptions?: ModalProps) => showModal(modalOptions ?? modalToRender!),
      updateModal,
      hideModal,
      hasModalById,
      hideAllModal,
    }),
    [modals, showModal, updateModal, hideModal, hasModalById, hideAllModal]
  )

  useEffect(() => {
    updateModal(modalToRender!)
  }, [prevDeps.current])

  return modalHook
}

const isShallowEqual = (prevDeps: any, nextDeps: any) =>
  !prevDeps?.some((dependency: any, index: number) => nextDeps[index] !== dependency) ?? false
