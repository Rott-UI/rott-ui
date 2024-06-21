// React Imports
import {useContext} from 'react'
import {themeConfig} from '../providers'

export type Variant = Keyof<typeof themeConfig.colors>
