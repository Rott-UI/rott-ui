// React Imports
import {ReactNode} from 'react'

// React Native Imports
import {TextInputProps} from 'react-native'

// Component Imports
import {InputType} from './inputType'
import {CommonUiProps, Size, Variant} from '../../../models'
import {SelectProps} from './selectProps'
import {InputLabelProps} from './inputLabelProps'
import {Theme} from '../../../models'
import {IconProps} from '../../Icon'
import {DataModel} from './dataModel'

// Package Imports
import {DatePickerProps} from 'react-native-date-picker'

export interface InputProps
  extends TextInputProps,
    Omit<DatePickerProps, 'style' | 'date' | 'mode'>,
    CommonUiProps {
  label: string | InputLabelProps
  name: string
  type?: InputType
  renderSeparator?: boolean
  /**
   * Kullanıldığı zaman tarih seçimi sırasında çıkan **"Temizle"** butonu renderlanamyacaktır.
   */
  mode?: 'date' | 'time' | 'datetime' | 'modal-date' | 'modal-time' | 'modal-datetime'
  data?: DataModel[]
  allowClear?: boolean
  date?: Date
  errorMessage?: string
  disabled?: boolean

  /**
   * Checkbox gereksinimleri
   */
  onCheckChange?: (checked: boolean) => void
  disabledInput?: boolean
  checked?: boolean
  /**
   * DropDown gereksinimleri
   */
  list?: SelectProps[]
  searchable?: boolean
  showDescription?: boolean
  showSelected?: boolean
  onSelectChange?: (value: string) => void
  onTouched?: () => void

  /**
   * Description verilirse Checkbox Input'da yanında açıklama yazısı yer alır.
   *
   * Bu yazı "string" olabileceği gibi React elementi de olabilir.
   */
  description?: string | boolean | ReactNode
  descriptionFontSize?: Size

  icon?: IconProps

  theme?: Theme

  border?: {
    width?: number
    variant?: Variant
    radius?: number
  }

  touched?: Nullable<boolean>

  /**
   * Toggle gereksinimleri
   */
  onToggle?: (checked: boolean) => void
  inputLabel?: string | InputLabelProps
  inputType?: InputType
  topSeparator?: boolean
  middleSeparator?: boolean
  bottomSeparator?: boolean
}
