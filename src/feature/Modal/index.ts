import {MutableRefObject, createRef} from 'react'
import {useModal} from './hooks'
import {ModalProps} from './models'

export * from './components'
export * from './style'
export * from './models'
export * from './hooks'

type ModalService = ReturnType<typeof useModal>

export const modalRef = createRef<ModalService>() as MutableRefObject<ModalService>

export const Modal: ModalService = {
  modals: modalRef.current?.modals,
  showModal: (modalOptions?: ModalProps) => modalRef.current?.showModal(modalOptions),
  updateModal: (modalToRender: ModalProps) => modalRef.current?.updateModal(modalToRender),
  hideModal: (id?: number) => modalRef.current?.hideModal(id),
  hasModalById: (id: number) => modalRef.current?.hasModalById(id),
  hideAllModal: () => modalRef.current?.hideAllModal(),
}
