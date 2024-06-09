/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import {createContext} from 'react'

// Modal Imports
import {ModalContextModel, ModalProps} from '../models'

export const ModalContext = createContext<ModalContextModel>({
  modals: [],
  showModal: (modalToRender: ModalProps) => {},
  updateModal: (modalToRender: ModalProps, id?: number) => {},
  hideModal: (id?: number) => {},
  hasModalById: (id?: number) => true,
  hideAllModal: () => {},
})
