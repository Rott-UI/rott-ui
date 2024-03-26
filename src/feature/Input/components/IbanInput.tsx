// React Imports
import {FC, useState} from 'react'

// React Native Imports
import {Platform, StyleSheet} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles, IbanInputStyles} from '../styles'
import {Item} from '../../Item'
import {Icon} from '../../Icon'
import {Pressable} from '../../Pressable'

//Package Imports
import {MaskedTextInput} from 'react-native-mask-text'

export const IbanInput: FC<Omit<InputProps, 'placeholder' | 'label' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  size,
  ...props
}) => {
  const [closeIconVisible, setCloseIconVisible] = useState(false)

  const handleTextChange = (inputText: string) => {
    const isValue = inputText === '' ? '' : 'TR' + inputText.replace(/[^0-9]/g, '')
    onChangeText!(isValue)
    setCloseIconVisible(isValue !== '')
  }

  return (
    <Item row>
      <MaskedTextInput
        testID='iban-input-test-id'
        mask='TR99 9999 9999 9999 9999 9999 99'
        placeholder='TR00 0000 0000 0000 0000 0000 00'
        keyboardType='number-pad'
        onChangeText={(text, rawText) => {
          handleTextChange(rawText)
        }}
        style={StyleSheet.flatten([
          InputStyles({
            fontSize,
            letterSpacing: Platform.OS === 'android' ? -1.5 : undefined,
            theme,
            size,
          }).defaultTextInputStyle,
        ])}
        numberOfLines={1}
        {...props}
      />

      {closeIconVisible && (
        <Pressable
          testID='clear-iban-icon-test-id'
          style={IbanInputStyles().closeIcon}
          justifyContentCenter
          alignItemsCenter
          onPress={() => handleTextChange('')}>
          <Icon name='REMOVE_CIRCLE' height={24} width={24} mode='fill' variant='grey-200' />
        </Pressable>
      )}
    </Item>
  )
}
