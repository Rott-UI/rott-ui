// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet, TextInput} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'

export const PlateNumberInput: FC<Omit<InputProps, 'label' | 'placeholder' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const handleTextChange = (plateNumber: string) => {
    const replacedPlateNumber = plateNumber.toUpperCase().replace(/[^0-9A-Z-]/g, '')
    onChangeText!(replacedPlateNumber)
  }

  return (
    <TextInput
      editable={!disabled}
      placeholder='_________'
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      keyboardType='default'
      maxLength={9}
      onChangeText={handleTextChange}
      {...props}
    />
  )
}
