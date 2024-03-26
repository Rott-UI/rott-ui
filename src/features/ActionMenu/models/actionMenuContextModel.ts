// Action Menu Imports
import {ActionMenuProps} from './actionMenuProps'

export interface ActionMenuContextModel {
  showActionMenu: (actionMenuProps: ActionMenuProps) => void
  hideActionMenu: () => void
}
