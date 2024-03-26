// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'

//Package Imports
import {MaskedTextInput} from 'react-native-mask-text'
import {Item} from '../../Item'

export const PhoneInput: FC<Omit<InputProps, 'placeholder' | 'label' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  size,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    const formattedText = inputText.replace(/^(\+90|90)/, '0').replace(/[^0-9]/g, '')
    onChangeText!(formattedText)
  }

  return (
    <Item row>
      <MaskedTextInput
        testID='phone-input-test-id'
        mask='0(999) 999 99 99'
        placeholder='0(999) 999 99 99'
        keyboardType='number-pad'
        onChangeText={(text, rawText) => handleTextChange(rawText)}
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        {...props}
      />
    </Item>
  )
}
