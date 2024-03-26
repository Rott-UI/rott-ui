// React Imports
import {ReactNode} from 'react'

// Component Imports
import {ImageTypes} from '../../Image'

export interface EmptyStateProps {
  description?: string | ReactNode
  name?: ImageTypes
}
