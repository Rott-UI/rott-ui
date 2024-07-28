// React Imports
import {PropsWithChildren} from 'react'

// React Native Imports
import {TextProps} from 'react-native'

// Feature Imports
import {FontFamily} from './fontFamily'
import {FontWeight} from './fontWeight'

// Model Imports
import {CommonUiProps} from '../../../models'

export interface LabelProps extends TextProps, CommonUiProps, PropsWithChildren {
  text?: string
  textCenter?: boolean
  fontWeight?: FontWeight
  fontFamily?: FontFamily
  letterSpacing?: number
}
