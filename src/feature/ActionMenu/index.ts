export * from './hooks'
export * from './components'
export * from './models'
export * from './providers'

// React Imports
import {MutableRefObject, createRef} from 'react'

// Action Menu Imports
import {useActionMenu} from './hooks'
import {ActionMenuProps} from './models'

type ActionMenuService = ReturnType<typeof useActionMenu>

export const actionMenuRef = createRef<ActionMenuService>() as MutableRefObject<ActionMenuService>

export const ActionMenu: ActionMenuService = {
  showActionMenu: (actionMenuProps: ActionMenuProps) =>
    actionMenuRef.current?.showActionMenu(actionMenuProps),
  hideActionMenu: () => actionMenuRef.current?.hideActionMenu(),
}
