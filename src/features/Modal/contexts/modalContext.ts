// React Imports
import {createContext} from 'react'
import {ModalContextModel, ModalProps} from '../models'

// Modal Imports

// modals: [],
export const ModalContext = createContext<ModalContextModel>({
  modals: [],
  showModal: (modalToRender: ModalProps) => {},
  updateModal: (modalToRender: ModalProps, id?: number) => {},
  hideModal: (id?: number) => {},
  hasModalById: (id?: number) => true,
  hideAllModal: () => {},
})
