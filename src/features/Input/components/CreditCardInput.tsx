// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'

// Package Imports
import {MaskedTextInput} from 'react-native-mask-text'

export const CreditCardInput: FC<Omit<InputProps, 'label' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const handleOnChangeText = (text: string) => {
    const replacedText = text.replace(/[^0-9]/g, '')
    onChangeText!(replacedText)
  }

  return (
    <MaskedTextInput
      editable={!disabled}
      mask='9999-9999-9999-9999'
      placeholder='**** **** **** ****'
      keyboardType='number-pad'
      maxLength={19}
      onChangeText={(text, rawText) => handleOnChangeText(rawText)}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      {...props}
    />
  )
}
