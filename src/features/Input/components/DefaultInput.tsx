// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet, TextInput} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'

export const DefaultInput: FC<Omit<InputProps, 'name'>> = ({
  label,
  placeholder,
  fontSize,
  theme,
  disabled,
  size,
  ...props
}) => {
  return (
    <TextInput
      editable={!disabled}
      keyboardType='default'
      autoCapitalize='none'
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      {...props}
    />
  )
}
