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
    if (prevDeps.current !== modalDependencies) updateModal(modalToRender!, modalToRender?.id)
  }, [prevDeps.current])

  return modalHook
}

function isShallowEqual(obj1: any, obj2: any): boolean {
  let result = true

  // If both are null or undefined, return true
  if (obj1 == null && obj2 == null) result = true
  // If only one is null or undefined, return false
  else if (obj1 == null || obj2 == null) result = false
  else if (obj1 instanceof Date && obj2 instanceof Date) result = obj1.getTime() === obj2.getTime()
  // If both are arrays, compare their elements
  else if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) result = false
    else {
      for (let i = 0; i < obj1.length; i++) {
        if (!isShallowEqual(obj1[i], obj2[i])) {
          result = false
          break
        }
      }
    }
  }
  // If both are objects, compare their keys and values
  else if (
    !Array.isArray(obj1) &&
    !Array.isArray(obj2) &&
    typeof obj1 === 'object' &&
    typeof obj2 === 'object'
  ) {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) result = false
    else {
      for (let key of keys1) {
        if (!keys2.includes(key.toString()) || !isShallowEqual(obj1[key], obj2[key])) {
          result = false
          break
        }
      }
    }
  }
  // If they are neither null, undefined, array, or object, compare them directly
  else result = obj1 === obj2

  return result
}
