// React Imports
import {FC} from 'react'

// Component Imports
import {Content} from '../../Content'
import {BottomMenuItem} from './BottomMenuItem'

// Feature Imports
import {getHasDynamicIslandState, getHasNotchState} from '../../../features/app/appSelector'
import {BottomMenuItemModel} from '../models'

// Hook Imports
import {useAppSelector} from '../../../hooks'
import {COLOURS} from '../../../constants'

interface BottomMenuProps {
  menuItems: BottomMenuItemModel[]
}

export const BottomMenu: FC<BottomMenuProps> = ({menuItems}) => {
  const hasDynamicIsland = useAppSelector(getHasDynamicIslandState)
  const hasNotch = useAppSelector(getHasNotchState)

  return (
    <Content
      testID='bottom-menu-container'
      row
      absolute
      bottom={0}
      noPadding
      paddingTop={11}
      size='full'
      borderTopStartRadius={24}
      borderTopEndRadius={24}
      justifyContentSpaceAround
      backgroundColor={COLOURS.SECONDARY}
      height={hasDynamicIsland || hasNotch ? 88 : 64}>
      {menuItems.map((props) => (
        <BottomMenuItem key={`${props?.title ?? 'Main_'}`} {...props} />
      ))}
    </Content>
  )
}
