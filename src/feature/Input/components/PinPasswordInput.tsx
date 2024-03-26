// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet, TextInput} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'
import {Item} from '../../Item'

export const PinPasswordInput: FC<Omit<InputProps, 'label' | 'placeholder' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  size,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    if (!!onChangeText) onChangeText(inputText.replace(/[^0-9]/g, ''))
  }

  return (
    <Item row>
      <TextInput
        placeholder='____'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        maxLength={4}
        secureTextEntry={true}
        onChangeText={handleTextChange}
        {...props}
      />
    </Item>
  )
}
