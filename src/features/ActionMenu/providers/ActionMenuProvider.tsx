// React Imports
import {FC, PropsWithChildren, useCallback, useMemo} from 'react'

// Constant Imports
import {COLOURS} from '../../../constants'

// Component Imports
import {Modal} from '../../Modal'

// Feature Imports
import {getHasDynamicIslandState, getHasNotchState} from '../../../features/app'

// Action Menu Imports
import {ActionMenuProps} from '../models'
import {useActionMenu} from '../hooks'
import {ActionMenuComponent, ActionMenuHeaderComponent, actionMenuRef} from '..'
import {ActionMenuContext} from '../contexts'
import {modalHeightNormalizer} from '../utils'

// Util and Lib Imports
import {display} from '../../../utils'

// Hook Imports
import {useAppSelector} from '../../../hooks'

export const ActionMenuProvider: FC<PropsWithChildren> = ({children}) => {
  const hasDynamicIsland = useAppSelector(getHasDynamicIslandState)
  const hasNotch = useAppSelector(getHasNotchState)

  const showActionMenu = (actionMenuProps: ActionMenuProps) => {
    const ITEM_HEIGHT = actionMenuProps.itemHeight === undefined ? 56 : actionMenuProps.itemHeight
    const MAX_ITEM = actionMenuProps.maxItem === undefined ? 4 : actionMenuProps.maxItem

    const SEPARATOR_TOTAL_HEIGHT =
      (actionMenuProps.data?.length ?? 0) > MAX_ITEM
        ? MAX_ITEM * display.px(1)
        : (actionMenuProps.data?.length ?? 0) * display.px(1)

    const modalHeightPercentage =
      modalHeightNormalizer(
        actionMenuProps.data?.length ?? 0,
        !!actionMenuProps.title,
        !!actionMenuProps.subTitle,
        SEPARATOR_TOTAL_HEIGHT,
        MAX_ITEM,
        ITEM_HEIGHT
      ) +
      (hasDynamicIsland ? 0 : -4) +
      (hasNotch ? 0 : -4)

    Modal.showModal({
      testID: 'action-menu-modal-test-id',
      visible: true,
      height: modalHeightPercentage,
      statusBarTranslucent: true,
      onClose: () => Modal.hideModal(),
      headerBackgroundColor: 'transparent',
      panResponderBackgroundColor: 'transparent',
      backgroundColor: COLOURS.TRANSPARENT,
      modalContainerMarginBottom: display.normalize(21, 'height'),
      header: (actionMenuProps.title || actionMenuProps.subTitle) && (
        <ActionMenuHeaderComponent
          title={actionMenuProps.title}
          subTitle={actionMenuProps.subTitle}
        />
      ),
      children: (
        <ActionMenuComponent
          {...actionMenuProps}
          maxItem={MAX_ITEM}
          itemHeight={ITEM_HEIGHT}
          separatorTotalHeight={SEPARATOR_TOTAL_HEIGHT}
        />
      ),
    })
  }

  const hideActionMenu = useCallback(() => Modal.hideModal(), [])

  const contextValue = useMemo(() => {
    return {
      showActionMenu,
      hideActionMenu,
    }
  }, [showActionMenu, hideActionMenu])

  return (
    <ActionMenuContext.Provider value={contextValue}>
      <InitializeActionMenuRef />

      {children}
    </ActionMenuContext.Provider>
  )
}

const InitializeActionMenuRef = () => {
  const actionMenuHook = useActionMenu()
  actionMenuRef.current = actionMenuHook

  return null
}
