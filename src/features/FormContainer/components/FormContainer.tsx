// React Imports
import {FC, PropsWithChildren} from 'react'

// Component Imports
import {Item} from '../../Item'
import {Theme} from '../../../models'

// Util and Lib Imports
import {themeConfig} from '../../../providers'

interface FormContainerProps extends PropsWithChildren {
  hasError?: boolean
  theme?: Theme
  marginBottom?: number
  marginTop?: number
}

export const FormContainer: FC<FormContainerProps> = ({
  hasError,
  children,
  theme = 'light',
  marginBottom,
  marginTop,
}) => {
  return (
    <Item
      overflowHidden
      backgroundColor={
        theme === 'light' ? themeConfig.colors['white'] : themeConfig.colors['grey-800']
      }
      borderRadius={8}
      paddingTop={4}
      paddingBottom={hasError ? 0 : 4}
      marginBottom={marginBottom}
      marginTop={marginTop}>
      {children}
    </Item>
  )
}
