// React Imports
import {FC} from 'react'

// Component Imports
import {Content} from '../../Content'
import {BottomMenuItem} from './BottomMenuItem'

// Feature Imports
import {BottomMenuItemModel} from '../models'
import {themeConfig} from '../../../providers'

// Hook Imports

interface BottomMenuProps {
  menuItems: BottomMenuItemModel[]
}

export const BottomMenu: FC<BottomMenuProps> = ({menuItems}) => {
  // TODO: Dynamic Island ve Notch kontrolü yapılacak
  const hasDynamicIsland = true
  const hasNotch = true

  return (
    <Content
      testID='bottom-menu-container'
      row
      absolute
      bottom={0}
      noPadding
      paddingTop={11}
      paddingHorizontal={8}
      size='full'
      borderTopStartRadius={24}
      borderTopEndRadius={24}
      justifyContentSpaceAround
      backgroundColor={themeConfig.colors.secondary}
      height={hasDynamicIsland || hasNotch ? 88 : 64}>
      {menuItems.map((props) => (
        <BottomMenuItem key={`${props?.title ?? 'Main_'}`} {...props} />
      ))}
    </Content>
  )
}
