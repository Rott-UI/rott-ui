// React Imports
import {createContext} from 'react'

// Action Menu Imports
import {ActionMenuContextModel} from '../models'

export const ActionMenuContext = createContext<ActionMenuContextModel>({
  showActionMenu: () => {},
  hideActionMenu: () => {},
})
