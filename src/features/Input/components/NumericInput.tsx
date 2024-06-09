// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet, TextInput} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'
import {Item} from '../../Item'

export const NumericInput: FC<Omit<InputProps, 'name'>> = ({
  label,
  placeholder,
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    onChangeText!(inputText.replace(/[^0-9]/g, ''))
  }

  return (
    <Item row>
      <TextInput
        editable={!disabled}
        placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        onChangeText={handleTextChange}
        {...props}
      />
    </Item>
  )
}
