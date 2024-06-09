// React Imports
// import {ComponentType} from 'react'

// Model Imports
import {CommonUiProps} from '../../models'

export interface TabWidgetProps extends CommonUiProps {
  testID?: string
  titles: string[]
  tabs: JSX.Element[]
  defaultIndex?: number
  onTabChange?: (index: number) => void
}
